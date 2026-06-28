const UserJourney = require("../models/UserJourney");
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const AppError = require("../utils/AppError");
const notificationService = require("./notificationService");
const {
    SKILL_CATEGORIES,
    COLLECTIONS,
    BADGE_DEFINITIONS,
    TITLE_DEFINITIONS,
    SEASONAL_EVENTS,
    STREAK_REWARDS,
    getLevelFromTotalXp,
    getTitleForLevel,
    resolveServiceXp,
    getSkillLevel,
    getCosmeticsForLevel,
    getNextLevelRewards,
} = require("../config/beautyJourneyConfig");

const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setHours(0, 0, 0, 0);
    d.setDate(diff);
    return d;
};

const addMilestone = (journey, type, label) => {
    const exists = journey.milestones.some((m) => m.type === type && m.label === label);
    if (!exists) {
        journey.milestones.unshift({ type, label, at: new Date() });
        journey.milestones = journey.milestones.slice(0, 30);
    }
};

const getSkillXp = (journey, category) => {
    const skill = journey.skills.find((s) => s.category === category);
    return skill?.xp || 0;
};

const addSkillXp = (journey, category, xp) => {
    let skill = journey.skills.find((s) => s.category === category);
    if (!skill) {
        skill = { category, xp: 0 };
        journey.skills.push(skill);
    }
    skill.xp += xp;
    if (!journey.skillsUsed.includes(category)) {
        journey.skillsUsed.push(category);
    }
};

const matchCollectionItems = (serviceName, collections = COLLECTIONS) => {
    const name = (serviceName || "").toLowerCase();
    const matched = [];
    for (const collection of collections) {
        for (const item of collection.items) {
            if (item.keywords.some((kw) => name.includes(kw))) {
                matched.push({ collectionId: collection.id, key: item.key });
            }
        }
    }
    return matched;
};

const updateStreak = (journey, visitDate) => {
    const visit = new Date(visitDate);
    const thisWeek = getWeekStart(visit).getTime();

    if (!journey.lastVisitAt) {
        journey.streakWeeks = 1;
        journey.weekStreakStart = getWeekStart(visit);
        journey.lastVisitAt = visit;
        return;
    }

    const lastWeek = getWeekStart(journey.lastVisitAt).getTime();
    const weeksDiff = Math.round((thisWeek - lastWeek) / (7 * 24 * 60 * 60 * 1000));

    if (weeksDiff === 0) {
        journey.lastVisitAt = visit;
        return;
    }

    if (weeksDiff === 1) {
        journey.streakWeeks += 1;
    } else if (weeksDiff > 1) {
        journey.streakWeeks = 1;
        journey.weekStreakStart = getWeekStart(visit);
    }

    journey.lastVisitAt = visit;
};

const buildStatsSnapshot = (journey, user) => {
    const bySkill = {};
    if (journey.appointmentsBySkill instanceof Map) {
        journey.appointmentsBySkill.forEach((v, k) => {
            bySkill[k] = v;
        });
    } else {
        Object.assign(bySkill, journey.appointmentsBySkill || {});
    }

    const memberDays = user?.createdAt
        ? Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (24 * 60 * 60 * 1000))
        : 0;

    return {
        totalXp: journey.totalXp,
        totalAppointments: journey.totalAppointments,
        bySkill,
        skillsUsed: journey.skillsUsed,
        hasBridal: journey.hasBridal,
        streakWeeks: journey.streakWeeks,
        memberDays,
        membership: user?.membership || "Bronze",
    };
};

const evaluateUnlocks = async (journey, user, notifications = [], previousTotalXp = null) => {
    const stats = buildStatsSnapshot(journey, user);
    const { level } = getLevelFromTotalXp(journey.totalXp);
    const previousLevel = previousTotalXp !== null
        ? getLevelFromTotalXp(previousTotalXp).level
        : level;

    const newCosmetics = getCosmeticsForLevel(level);
    for (const cosmeticId of newCosmetics) {
        if (!journey.unlockedCosmetics.includes(cosmeticId)) {
            journey.unlockedCosmetics.push(cosmeticId);
        }
    }

    for (const badge of BADGE_DEFINITIONS) {
        if (!journey.unlockedBadges.includes(badge.id) && badge.check(stats)) {
            journey.unlockedBadges.push(badge.id);
            notifications.push({
                type: "badge",
                title: "Badge Earned",
                message: `${badge.emoji} ${badge.title}`,
            });
            addMilestone(journey, "badge", badge.title);
        }
    }

    for (const titleDef of TITLE_DEFINITIONS) {
        if (!journey.unlockedTitles.includes(titleDef.id) && titleDef.check(stats)) {
            journey.unlockedTitles.push(titleDef.id);
            notifications.push({
                type: "title",
                title: "New Title Unlocked",
                message: `${titleDef.emoji} ${titleDef.title}`,
            });
        }
    }

    const levelTitle = getTitleForLevel(level);
    if (level > previousLevel) {
        notifications.push({
            type: "level",
            title: "Level Up!",
            message: `You reached Level ${level} — ${levelTitle.title}`,
        });
        addMilestone(journey, "level", `Level ${level}`);
    }

    for (const reward of STREAK_REWARDS) {
        if (journey.streakWeeks >= reward.weeks && reward.glowPoints && user) {
            const streakKey = `streak_reward_${reward.weeks}`;
            if (!journey.unlockedBadges.includes(streakKey)) {
                user.glowPoints = (user.glowPoints || 0) + reward.glowPoints;
                user.lifetimeGlowPoints = (user.lifetimeGlowPoints || 0) + reward.glowPoints;
                journey.unlockedBadges.push(streakKey);
            }
        }
    }
};

const backfillFromHistory = async (journey, userId) => {
    if (journey.backfilled) return;

    const completed = await Appointment.find({
        customer: userId,
        status: "Completed",
    }).sort("completedAt");

    const serviceIds = [
        ...new Set(
            completed.flatMap((a) => a.services.map((s) => s.service).filter(Boolean))
        ),
    ];
    const services = await Service.find({ _id: { $in: serviceIds } });
    const serviceMap = Object.fromEntries(services.map((s) => [s._id.toString(), s]));

    for (const appointment of completed) {
        for (const snap of appointment.services) {
            const svc = snap.service ? serviceMap[snap.service.toString()] : null;
            const category = svc?.category || "Spa & Wellness";
            const { xp, skill } = resolveServiceXp(snap.serviceName, category);

            journey.totalXp += xp;
            addSkillXp(journey, skill, xp);
            journey.totalAppointments += 1;

            const count = journey.appointmentsBySkill.get(skill) || 0;
            journey.appointmentsBySkill.set(skill, count + 1);

            if (snap.serviceName?.toLowerCase().includes("bridal")) {
                journey.hasBridal = true;
            }

            for (const match of matchCollectionItems(snap.serviceName)) {
                let col = journey.collections.find((c) => c.collectionId === match.collectionId);
                if (!col) {
                    col = { collectionId: match.collectionId, completedKeys: [] };
                    journey.collections.push(col);
                }
                if (!col.completedKeys.includes(match.key)) {
                    col.completedKeys.push(match.key);
                }
            }
        }

        if (appointment.completedAt) {
            updateStreak(journey, appointment.completedAt);
        }
    }

    if (completed.length > 0) {
        addMilestone(journey, "first_appointment", "First Appointment");
    }

    journey.backfilled = true;
};

const getOrCreateJourney = async (userId) => {
    let journey = await UserJourney.findOne({ user: userId });
    if (!journey) {
        journey = await UserJourney.create({
            user: userId,
            skills: SKILL_CATEGORIES.map((category) => ({ category, xp: 0 })),
        });
    }

    if (!journey.backfilled) {
        await backfillFromHistory(journey, userId);
        const user = await User.findById(userId);
        await evaluateUnlocks(journey, user, [], journey.totalXp);
        await journey.save();
        if (user) await user.save();
    }

    return journey;
};

const processAppointmentCompletion = async (userId, appointment) => {
    const journey = await getOrCreateJourney(userId);
    const user = await User.findById(userId);
    const notifications = [];
    const previousTotalXp = journey.totalXp;
    let xpGained = 0;

    const serviceIds = appointment.services.map((s) => s.service).filter(Boolean);
    const services = await Service.find({ _id: { $in: serviceIds } });
    const serviceMap = Object.fromEntries(services.map((s) => [s._id.toString(), s]));

    for (const snap of appointment.services) {
        const svc = snap.service ? serviceMap[snap.service.toString()] : null;
        const category = svc?.category || "Spa & Wellness";
        const { xp, skill } = resolveServiceXp(snap.serviceName, category);

        journey.totalXp += xp;
        xpGained += xp;
        addSkillXp(journey, skill, xp);
        journey.totalAppointments += 1;

        const count = journey.appointmentsBySkill.get(skill) || 0;
        journey.appointmentsBySkill.set(skill, count + 1);

        if (snap.serviceName?.toLowerCase().includes("bridal")) {
            journey.hasBridal = true;
        }

        for (const match of matchCollectionItems(snap.serviceName)) {
            let col = journey.collections.find((c) => c.collectionId === match.collectionId);
            if (!col) {
                col = { collectionId: match.collectionId, completedKeys: [] };
                journey.collections.push(col);
            }
            if (!col.completedKeys.includes(match.key)) {
                col.completedKeys.push(match.key);
            }
        }
    }

    updateStreak(journey, appointment.completedAt || new Date());

    if (journey.totalAppointments === 1) {
        addMilestone(journey, "first_appointment", "First Appointment");
    }

    for (const collectionDef of COLLECTIONS) {
        const progress = journey.collections.find((c) => c.collectionId === collectionDef.id);
        if (
            progress &&
            progress.completedKeys.length >= collectionDef.items.length &&
            !journey.completedCollectionIds.includes(collectionDef.id)
        ) {
            journey.completedCollectionIds.push(collectionDef.id);
            journey.totalXp += collectionDef.rewards.xp || 0;
            if (collectionDef.rewards.glowPoints && user) {
                user.glowPoints += collectionDef.rewards.glowPoints;
                user.lifetimeGlowPoints += collectionDef.rewards.glowPoints;
            }
            if (collectionDef.rewards.badgeId) {
                journey.unlockedBadges.push(collectionDef.rewards.badgeId);
            }
            notifications.push({
                type: "collection",
                title: "Collection Complete!",
                message: `${collectionDef.title} completed`,
            });
        }
    }

    await evaluateUnlocks(journey, user, notifications, previousTotalXp);
    await journey.save();
    if (user) await user.save();

    for (const n of notifications) {
        notificationService
            .sendToUser(userId, "Glow Points", n.title, n.message, { route: "/profile" })
            .catch(console.error);
    }

    return { journey, xpGained, notifications };
};

const buildJourneyResponse = (journey, user) => {
    const levelInfo = getLevelFromTotalXp(journey.totalXp);
    const levelTitle = getTitleForLevel(levelInfo.level);
    const stats = buildStatsSnapshot(journey, user);

    const skills = SKILL_CATEGORIES.map((category) => {
        const xp = getSkillXp(journey, category);
        const skillLevel = getSkillLevel(xp);
        return {
            category,
            ...skillLevel,
            totalXp: xp,
        };
    });

    const badges = BADGE_DEFINITIONS.map((badge) => ({
        id: badge.id,
        title: badge.title,
        description: badge.description,
        emoji: badge.emoji,
        unlocked: journey.unlockedBadges.includes(badge.id) || badge.check(stats),
        unlockedAt: journey.unlockedBadges.includes(badge.id) ? true : null,
    }));

    const collections = COLLECTIONS.map((def) => {
        const progress = journey.collections.find((c) => c.collectionId === def.id);
        const completedKeys = progress?.completedKeys || [];
        const items = def.items.map((item) => ({
            key: item.key,
            label: item.label,
            completed: completedKeys.includes(item.key),
        }));
        const percent = Math.round((completedKeys.length / def.items.length) * 100);
        return {
            id: def.id,
            title: def.title,
            description: def.description,
            items,
            percent,
            completed: journey.completedCollectionIds.includes(def.id),
            rewards: def.rewards,
        };
    });

    const now = new Date();
    const seasonalEvents = SEASONAL_EVENTS.map((event) => ({
        ...event,
        active:
            event.active ||
            (now.getMonth() + 1 >= event.startMonth && now.getMonth() + 1 <= event.endMonth),
    }));

    const timeline = [
        { label: "Joined Salon", at: user?.createdAt, done: true },
        { label: "First Appointment", at: journey.milestones.find((m) => m.type === "first_appointment")?.at, done: journey.totalAppointments >= 1 },
        { label: "Bronze Member", done: true },
        { label: "100 XP", done: journey.totalXp >= 100 },
        { label: "Hair Master", done: getSkillLevel(getSkillXp(journey, "Hair Care")).level >= 5 },
        { label: "Silver Member", done: ["Silver", "Gold", "Diamond"].includes(user?.membership) },
        { label: "500 XP", done: journey.totalXp >= 500 },
        { label: "Diamond Member", done: user?.membership === "Diamond" },
    ];

    const streakCalendar = Array.from({ length: 7 }, (_, i) => {
        const day = new Date();
        day.setDate(day.getDate() - (6 - i));
        const active = journey.lastVisitAt && getWeekStart(journey.lastVisitAt).getTime() === getWeekStart(day).getTime();
        return {
            label: day.toLocaleDateString("en", { weekday: "narrow" }),
            active,
        };
    });

    return {
        totalXp: journey.totalXp,
        level: levelInfo.level,
        currentLevelXp: levelInfo.currentLevelXp,
        xpForNextLevel: levelInfo.xpForNextLevel,
        xpRemaining: levelInfo.xpRemaining,
        levelProgress: Math.round((levelInfo.currentLevelXp / levelInfo.xpForNextLevel) * 100),
        activeTitle: levelTitle.title,
        activeTitleEmoji: levelTitle.emoji,
        unlockedTitles: journey.unlockedTitles,
        unlockedCosmetics: journey.unlockedCosmetics.length
            ? journey.unlockedCosmetics
            : getCosmeticsForLevel(levelInfo.level),
        skills,
        badges,
        collections,
        streak: {
            weeks: journey.streakWeeks,
            calendar: streakCalendar,
            nextReward: STREAK_REWARDS.find((r) => r.weeks > journey.streakWeeks),
        },
        timeline,
        milestones: journey.milestones.slice(0, 8),
        nextRewards: getNextLevelRewards(levelInfo.level),
        seasonalEvents,
        stats: {
            totalAppointments: journey.totalAppointments,
        },
    };
};

const getMyJourney = async (userId) => {
    const journey = await getOrCreateJourney(userId);
    const user = await User.findById(userId);
    return buildJourneyResponse(journey, user);
};

module.exports = {
    getMyJourney,
    processAppointmentCompletion,
    getOrCreateJourney,
};
