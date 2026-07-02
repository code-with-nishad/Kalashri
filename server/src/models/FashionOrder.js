const mongoose = require("mongoose");

const fashionOrderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        dressType: {
            type: String,
            required: true,
        },
        measurements: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MeasurementProfile",
        },
        orderDate: {
            type: Date,
            default: Date.now,
            required: true,
        },
        deliveryDate: {
            type: Date,
            required: true,
        },
        advancePaid: {
            type: Number,
            default: 0,
        },
        remainingAmount: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Ready", "Delivered", "Cancelled"],
            default: "Pending",
        },
        referenceImages: [
            {
                type: String,
            },
        ],
        notes: {
            type: String,
        },
        timeline: [
            {
                status: String,
                date: { type: Date, default: Date.now },
                note: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("FashionOrder", fashionOrderSchema);
