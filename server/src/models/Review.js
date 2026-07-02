const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required: false,
        },
        fashionOrder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FashionOrder",
            required: false,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        reviewText: {
            type: String,
            required: true,
            trim: true,
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Ensure one review per appointment or fashion order
reviewSchema.index({ appointment: 1 }, { unique: true, sparse: true });
reviewSchema.index({ fashionOrder: 1 }, { unique: true, sparse: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
