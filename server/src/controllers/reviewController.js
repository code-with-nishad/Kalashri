const reviewService = require("../services/reviewService");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");

const createReview = asyncHandler(async (req, res) => {
    const review = await reviewService.createReview(req.user._id, req.body);
    sendResponse(res, 201, true, "Review submitted successfully", review);
});

const getPublicReviews = asyncHandler(async (req, res) => {
    const reviews = await reviewService.getPublicReviews();
    sendResponse(res, 200, true, "Public reviews fetched successfully", reviews);
});

const getMyReviews = asyncHandler(async (req, res) => {
    const reviews = await reviewService.getMyReviews(req.user._id);
    sendResponse(res, 200, true, "My reviews fetched successfully", reviews);
});

module.exports = {
    createReview,
    getPublicReviews,
    getMyReviews,
};
