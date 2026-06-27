const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
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
        year: {
            type: Number,
            required: [true, "Year is required"],
        },
        image: {
            type: String,
            default: "",
        },
        category: {
            type: String,
            enum: ["Award", "Achievement", "Certificate", "Trophy", "Milestone", "Media"],
            required: [true, "Category is required"],
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Achievement", achievementSchema);
