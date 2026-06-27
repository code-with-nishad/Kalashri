const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Reward title is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        glowPointsRequired: {
            type: Number,
            required: [true, "Glow Points Required is required"],
            min: [0, "Glow points cannot be negative"],
        },
        discountAmount: {
            type: Number,
            required: [true, "Discount Amount is required"],
            min: [1, "Discount must be at least 1"],
            max: [1000, "Discount cannot exceed 1000"], // small local beauty parlour logic
        },
        minimumBill: {
            type: Number,
            required: [true, "Minimum Bill is required"],
            min: [0, "Minimum Bill cannot be negative"],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Reward", rewardSchema);
