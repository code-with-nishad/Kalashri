/** Central config for Beauty Journey — extend here without schema changes */

const SKILL_CATEGORIES = [
    "Hair Care",
    "Skin Care",
    "Nail Care",
    "Makeup",
    "Spa & Wellness",
];

const CATEGORY_TO_SKILL = {
    "Hair Care": "Hair Care",
    "Skin Care": "Skin Care",
    "Facial": "Skin Care",
    Makeup: "Makeup",
    Bridal: "Makeup",
    "Body Care": "Spa & Wellness",
    "Nail Care": "Nail Care",
};

const SERVICE_XP_RULES = [
    { keywords: ["bridal"], xp: 200, skill: "Makeup" },
    { keywords: ["keratin"], xp: 150, skill: "Hair Care" },
    { keywords: ["hair spa", "hairspa"], xp: 80, skill: "Hair Care" },
    { keywords: ["hair color", "haircolour", "color"], xp: 90, skill: "Hair Care" },
    { keywords: ["haircut", "hair cut", "trim", "cut"], xp: 40, skill: "Hair Care" },
    { keywords: ["facial"], xp: 70, skill: "Skin Care" },
    { keywords: ["nail"], xp: 60, skill: "Nail Care" },
    { keywords: ["spa", "massage", "wellness"], xp: 90, skill: "Spa & Wellness" },
    { keywords: ["makeup", "make-up"], xp: 70, skill: "Makeup" },
    { keywords: ["smoothening", "smoothing", "botox", "treatment"], xp: 120, skill: "Hair Care" },
];

const DEFAULT_SERVICE_XP = 50;

const LEVEL_TITLES = [
    { minLevel: 50, id: "beauty_goddess", title: "Beauty Goddess", emoji: "✨" },
    { minLevel: 35, id: "diamond_diva", title: "Diamond Diva", emoji: "💎" },
    { minLevel: 20, id: "royal_stylist", title: "Royal Stylist", emoji: "👑" },
    { minLevel: 10, id: "beauty_queen", title: "Beauty Queen", emoji: "👑" },
    { minLevel: 5, id: "glow_princess", title: "Glow Princess", emoji: "✨" },
    { minLevel: 1, id: "fresh_beauty", title: "Fresh Beauty", emoji: "🌸" },
];

const COSMETIC_UNLOCKS = [
    { id: "sparkle_bg", minLevel: 2, label: "Sparkle Background" },
    { id: "styled_hair", minLevel: 3, label: "Styled Hair" },
    { id: "elegant_dress", minLevel: 5, label: "Elegant Dress" },
    { id: "princess_crown", minLevel: 5, label: "Princess Crown" },
    { id: "makeup_glow", minLevel: 8, label: "Makeup Glow" },
    { id: "queen_crown", minLevel: 10, label: "Queen Crown" },
    { id: "royal_accessories", minLevel: 15, label: "Royal Accessories" },
    { id: "diamond_sparkle", minLevel: 20, label: "Diamond Sparkle" },
    { id: "wings", minLevel: 35, label: "Angel Wings" },
    { id: "goddess_aura", minLevel: 50, label: "Goddess Aura" },
];

const BADGE_DEFINITIONS = [
    { id: "first_appointment", title: "First Appointment", description: "Complete your first visit", emoji: "🎖️", check: (s) => s.totalAppointments >= 1 },
    { id: "ten_services", title: "Salon Regular", description: "Book 10 services", emoji: "💫", check: (s) => s.totalAppointments >= 10 },
    { id: "fifty_services", title: "Beauty Legend", description: "Book 50 appointments", emoji: "🏆", check: (s) => s.totalAppointments >= 50 },
    { id: "hair_lover", title: "Hair Lover", description: "Book 5 hair services", emoji: "💇", check: (s) => (s.bySkill?.["Hair Care"] || 0) >= 5 },
    { id: "makeup_artist", title: "Makeup Artist", description: "Book 5 makeup services", emoji: "💄", check: (s) => (s.bySkill?.Makeup || 0) >= 5 },
    { id: "every_category", title: "Salon Explorer", description: "Try every beauty skill", emoji: "🌸", check: (s) => (s.skillsUsed?.length || 0) >= SKILL_CATEGORIES.length },
    { id: "bridal_package", title: "Bridal Glow", description: "Book a bridal service", emoji: "👰", check: (s) => s.hasBridal },
    { id: "first_glow", title: "First Glow", description: "Earn your first XP", emoji: "✨", check: (s) => s.totalXp >= 1 },
    { id: "streak_4", title: "Glow Streak", description: "4-week visit streak", emoji: "🔥", check: (s) => s.streakWeeks >= 4 },
    { id: "streak_12", title: "Perfect Attendance", description: "12-week visit streak", emoji: "⭐", check: (s) => s.streakWeeks >= 12 },
    { id: "one_year", title: "1 Year Member", description: "Member for 1 year", emoji: "🎂", check: (s) => s.memberDays >= 365 },
    { id: "vip_customer", title: "VIP Customer", description: "Reach Gold membership", emoji: "👑", check: (s) => ["Gold", "Diamond"].includes(s.membership) },
];

const TITLE_DEFINITIONS = [
    { id: "first_glow", title: "First Glow", emoji: "✨", check: (s) => s.totalXp >= 1 },
    { id: "hair_lover_title", title: "Hair Lover", emoji: "💇", check: (s) => (s.bySkill?.["Hair Care"] || 0) >= 3 },
    { id: "makeup_artist_title", title: "Makeup Artist", emoji: "💄", check: (s) => (s.bySkill?.Makeup || 0) >= 3 },
    { id: "salon_star", title: "Salon Star", emoji: "🌸", check: (s) => s.totalAppointments >= 25 },
    { id: "diamond_beauty", title: "Diamond Beauty", emoji: "💎", check: (s) => s.membership === "Diamond" },
];

const COLLECTIONS = [
    {
        id: "hair_journey",
        title: "Hair Journey",
        description: "Complete the ultimate hair care collection",
        items: [
            { key: "haircut", label: "Haircut", keywords: ["haircut", "hair cut", "trim"] },
            { key: "hair_spa", label: "Hair Spa", keywords: ["hair spa", "hairspa"] },
            { key: "hair_color", label: "Hair Color", keywords: ["hair color", "colour", "color"] },
            { key: "keratin", label: "Keratin", keywords: ["keratin"] },
            { key: "smoothening", label: "Smoothening", keywords: ["smoothening", "smoothing"] },
            { key: "botox", label: "Botox", keywords: ["botox"] },
        ],
        rewards: { xp: 150, glowPoints: 50, badgeId: "hair_collection" },
    },
];

const STREAK_REWARDS = [
    { weeks: 4, glowPoints: 100, badgeId: "streak_4" },
    { weeks: 8, badgeId: "streak_8", label: "Streak Star Badge" },
    { weeks: 12, glowPoints: 200, discountPercent: 10, badgeId: "streak_12" },
];

const SEASONAL_EVENTS = [
    {
        id: "diwali_glow",
        title: "Diwali Glow Event",
        description: "Book any facial or makeup service during Diwali season",
        active: false,
        startMonth: 10,
        endMonth: 11,
        objective: { skill: "Skin Care", count: 1 },
        rewards: { badgeId: "diwali_glow", cosmeticId: "diwali_outfit" },
    },
    {
        id: "womens_day",
        title: "Women's Day Event",
        description: "Celebrate with any spa or wellness service in March",
        active: false,
        startMonth: 3,
        endMonth: 3,
        objective: { skill: "Spa & Wellness", count: 1 },
        rewards: { badgeId: "womens_day", glowPoints: 30 },
    },
];

function xpRequiredForLevel(level) {
    return 100 + level * 100;
}

function getLevelFromTotalXp(totalXp) {
    let level = 1;
    let remaining = totalXp;

    while (remaining >= xpRequiredForLevel(level)) {
        remaining -= xpRequiredForLevel(level);
        level += 1;
    }

    return {
        level,
        currentLevelXp: remaining,
        xpForNextLevel: xpRequiredForLevel(level),
        xpRemaining: xpRequiredForLevel(level) - remaining,
    };
}

function getTitleForLevel(level) {
    return LEVEL_TITLES.find((t) => level >= t.minLevel) || LEVEL_TITLES[LEVEL_TITLES.length - 1];
}

function resolveServiceXp(serviceName, category) {
    const name = (serviceName || "").toLowerCase();
    for (const rule of SERVICE_XP_RULES) {
        if (rule.keywords.some((kw) => name.includes(kw))) {
            return { xp: rule.xp, skill: rule.skill };
        }
    }
    const skill = CATEGORY_TO_SKILL[category] || mapCategoryFallback(category);
    return { xp: DEFAULT_SERVICE_XP, skill };
}

function mapCategoryFallback(category) {
    if (!category) return "Spa & Wellness";
    const lower = category.toLowerCase();
    if (lower.includes("hair")) return "Hair Care";
    if (lower.includes("skin") || lower.includes("facial")) return "Skin Care";
    if (lower.includes("nail")) return "Nail Care";
    if (lower.includes("makeup") || lower.includes("bridal")) return "Makeup";
    return "Spa & Wellness";
}

function skillXpForLevel(level) {
    return xpRequiredForLevel(level);
}

function getSkillLevel(skillXp) {
    let level = 1;
    let remaining = skillXp;
    while (remaining >= skillXpForLevel(level)) {
        remaining -= skillXpForLevel(level);
        level += 1;
    }
    const xpForNext = skillXpForLevel(level);
    return {
        level,
        xp: remaining,
        xpForNextLevel: xpForNext,
        percent: Math.min(100, Math.round((remaining / xpForNext) * 100)),
    };
}

function getCosmeticsForLevel(level) {
    return COSMETIC_UNLOCKS.filter((c) => level >= c.minLevel).map((c) => c.id);
}

function getNextLevelRewards(level) {
    const rewards = [];
    const nextLevel = level + 1;
    const cosmetic = COSMETIC_UNLOCKS.find((c) => c.minLevel === nextLevel);
    if (cosmetic) rewards.push({ type: "cosmetic", label: cosmetic.label, id: cosmetic.id });
    if (nextLevel % 5 === 0) rewards.push({ type: "glowPoints", label: `${nextLevel * 10} Glow Points`, amount: nextLevel * 10 });
    const title = LEVEL_TITLES.find((t) => t.minLevel === nextLevel);
    if (title) rewards.push({ type: "title", label: title.title });
    if (rewards.length === 0) rewards.push({ type: "xp", label: "New milestone progress" });
    return rewards;
}

module.exports = {
    SKILL_CATEGORIES,
    CATEGORY_TO_SKILL,
    SERVICE_XP_RULES,
    LEVEL_TITLES,
    COSMETIC_UNLOCKS,
    BADGE_DEFINITIONS,
    TITLE_DEFINITIONS,
    COLLECTIONS,
    STREAK_REWARDS,
    SEASONAL_EVENTS,
    xpRequiredForLevel,
    getLevelFromTotalXp,
    getTitleForLevel,
    resolveServiceXp,
    getSkillLevel,
    getCosmeticsForLevel,
    getNextLevelRewards,
    mapCategoryFallback,
};
