const mongoose = require("mongoose");

const loyaltyTransactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
        },
        points: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ["Earned", "Redeemed"],
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("LoyaltyTransaction", loyaltyTransactionSchema);
