const { z } = require("zod");

const createReviewSchema = z.object({
    appointmentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid appointment ID"),
    rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
    reviewText: z.string().min(3, "Review text must be at least 3 characters").max(500, "Review text is too long"),
});

module.exports = {
    createReviewSchema,
};
