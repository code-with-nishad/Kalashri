const mongoose = require("mongoose");

const insuranceLeadSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
        },
        insuranceType: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["New", "Contacted", "Interested", "Purchased", "Rejected"],
            default: "New",
        },
        notes: {
            type: String,
        },
        followUpDate: {
            type: Date,
        },
        assignedStaff: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        callHistory: [
            {
                date: { type: Date, default: Date.now },
                note: String,
            },
        ],
        documents: [
            {
                name: String,
                url: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("InsuranceLead", insuranceLeadSchema);
