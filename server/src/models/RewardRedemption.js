const mongoose = require("mongoose");

const rewardRedemptionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        reward: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reward",
            required: true,
        },
        glowPointsSpent: {
            type: Number,
            required: true,
        },
        discountAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Success"], // Could be expanded later
            default: "Success",
        },
        redeemedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("RewardRedemption", rewardRedemptionSchema);
