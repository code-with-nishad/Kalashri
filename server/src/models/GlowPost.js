const mongoose = require("mongoose");

const glowPostSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        caption: {
            type: String,
            required: [true, "Caption is required"],
            trim: true,
        },
        images: {
            type: [String],
            default: [],
        },
        beforeImage: {
            type: String,
            default: "",
        },
        afterImage: {
            type: String,
            default: "",
        },
        isBeforeAfter: {
            type: Boolean,
            default: false,
        },
        services: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Service",
            },
        ],
        customServices: {
            type: [String],
            default: [],
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isPinned: {
            type: Boolean,
            default: false,
        },
        views: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("GlowPost", glowPostSchema);
