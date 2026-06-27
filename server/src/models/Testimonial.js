const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: [true, "Customer name is required"],
            trim: true,
        },
        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating cannot exceed 5"],
        },
        review: {
            type: String,
            required: [true, "Review text is required"],
            trim: true,
        },
        customerImage: {
            type: String,
            default: "",
        },
        approved: {
            type: Boolean,
            default: false,
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

module.exports = mongoose.model("Testimonial", testimonialSchema);
