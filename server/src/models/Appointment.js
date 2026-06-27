const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        services: [
            {
                service: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Service",
                    required: true,
                },
                serviceName: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                duration: {
                    type: Number,
                    required: true,
                },
            },
        ],
        appointmentDate: {
            type: Date,
            required: true,
        },
        appointmentTime: {
            type: String,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        totalDuration: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
            default: "Pending",
        },
        suggestedTimeFrame: {
            type: String,
            trim: true,
        },
        notes: {
            type: String,
            trim: true,
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid"],
            default: "Pending",
        },
        paymentMethod: {
            type: String,
            enum: ["Cash", "UPI", "Card"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
