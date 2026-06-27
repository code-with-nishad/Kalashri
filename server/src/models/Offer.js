const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        bannerImage: {
            type: String,
            default: "",
        },
        discountText: {
            type: String,
            required: [true, "Discount text is required (e.g., '20% OFF')"],
            trim: true,
        },
        startDate: {
            type: Date,
            required: [true, "Start date is required"],
        },
        endDate: {
            type: Date,
            required: [true, "End date is required"],
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Offer", offerSchema);
