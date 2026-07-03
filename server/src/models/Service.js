const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Service name is required"],
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
            required: [true, "Service category is required"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Service price is required"],
            min: [0, "Price cannot be negative"],
        },
        displayPrice: {
            type: String,
            trim: true,
        },
        discountPrice: {
            type: Number,
            min: [0, "Discount price cannot be negative"],
        },
        duration: {
            type: Number,
            required: [true, "Service duration is required"],
            min: [1, "Duration must be at least 1 minute"],
        },
        image: {
            type: String,
            trim: true,
        },
        benefits: [{ type: String, trim: true }],
        featured: { type: Boolean, default: false },
        popular: { type: Boolean, default: false },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
