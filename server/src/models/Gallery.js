const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
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
        image: {
            type: String,
            required: [true, "Image URL is required"],
        },
        category: {
            type: String,
            enum: [
                "Facial",
                "Hair",
                "Hair Color",
                "Hair Spa",
                "Waxing",
                "Threading",
                "Bridal",
                "Nails",
                "Skin",
                "Fashion",
                "Aari Work",
                "Traditional Wear",
                "Before & After",
                "Other",
            ],
            required: [true, "Category is required"],
        },
        featured: {
            type: Boolean,
            default: false,
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

module.exports = mongoose.model("Gallery", gallerySchema);
