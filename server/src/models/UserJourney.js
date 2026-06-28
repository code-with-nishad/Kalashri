const mongoose = require("mongoose");

const skillProgressSchema = new mongoose.Schema(
    {
        category: { type: String, required: true },
        xp: { type: Number, default: 0 },
    },
    { _id: false }
);

const collectionProgressSchema = new mongoose.Schema(
    {
        collectionId: { type: String, required: true },
        completedKeys: { type: [String], default: [] },
    },
    { _id: false }
);

const milestoneSchema = new mongoose.Schema(
    {
        type: { type: String, required: true },
        label: { type: String, required: true },
        at: { type: Date, default: Date.now },
    },
    { _id: false }
);

const userJourneySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        totalXp: { type: Number, default: 0 },
        skills: { type: [skillProgressSchema], default: [] },
        unlockedBadges: { type: [String], default: [] },
        unlockedTitles: { type: [String], default: [] },
        unlockedCosmetics: { type: [String], default: [] },
        collections: { type: [collectionProgressSchema], default: [] },
        streakWeeks: { type: Number, default: 0 },
        lastVisitAt: { type: Date },
        weekStreakStart: { type: Date },
        totalAppointments: { type: Number, default: 0 },
        appointmentsBySkill: {
            type: Map,
            of: Number,
            default: {},
        },
        skillsUsed: { type: [String], default: [] },
        hasBridal: { type: Boolean, default: false },
        completedCollectionIds: { type: [String], default: [] },
        milestones: { type: [milestoneSchema], default: [] },
        backfilled: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserJourney", userJourneySchema);
