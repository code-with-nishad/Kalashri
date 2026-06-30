const Review = require("../models/Review");
const Appointment = require("../models/Appointment");
const AppError = require("../utils/AppError");
const { createReviewSchema } = require("../validations/reviewValidation");

const createReview = async (userId, data) => {
    const validationResult = createReviewSchema.safeParse(data);
    if (!validationResult.success) {
        const errors = validationResult.error.issues.map((err) => err.message).join(", ");
        throw new AppError(errors, 400);
    }

    const { appointmentId, rating, reviewText } = validationResult.data;

    // Check if appointment exists, belongs to user, and is Completed
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
        throw new AppError("Appointment not found", 404);
    }

    if (appointment.customer.toString() !== userId.toString()) {
        throw new AppError("You do not have permission to review this appointment", 403);
    }

    if (appointment.status !== "Completed") {
        throw new AppError("You can only review completed appointments", 400);
    }

    // Check if review already exists for this appointment
    const existingReview = await Review.findOne({ appointment: appointmentId });
    if (existingReview) {
        throw new AppError("You have already reviewed this appointment", 400);
    }

    const review = await Review.create({
        customer: userId,
        appointment: appointmentId,
        rating,
        reviewText,
        isPublic: true,
    });

    return review;
};

const getPublicReviews = async () => {
    const reviews = await Review.find({ isPublic: true })
        .populate("customer", "firstName lastName avatar")
        .sort({ createdAt: -1 })
        .limit(20);
    
    return reviews;
};

const getMyReviews = async (userId) => {
    const reviews = await Review.find({ customer: userId })
        .populate("appointment", "services appointmentDate appointmentTime status")
        .sort({ createdAt: -1 });

    return reviews;
};

module.exports = {
    createReview,
    getPublicReviews,
    getMyReviews,
};
