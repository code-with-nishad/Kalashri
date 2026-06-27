const { z } = require("zod");

const createRewardSchema = z.object({
    title: z.string({ required_error: "Title is required" }).min(1, "Title cannot be empty").trim(),
    description: z.string().trim().optional(),
    glowPointsRequired: z.number({ required_error: "Glow Points Required is required" }).min(0, "Cannot be negative"),
    discountAmount: z.number({ required_error: "Discount Amount is required" }).min(1, "Discount must be at least 1").max(1000, "Discount cannot exceed 1000 for local shop"),
    minimumBill: z.number({ required_error: "Minimum Bill is required" }).min(0, "Minimum Bill cannot be negative"),
    isActive: z.boolean().optional(),
});

const updateRewardSchema = z.object({
    title: z.string().min(1, "Title cannot be empty").trim().optional(),
    description: z.string().trim().optional(),
    glowPointsRequired: z.number().min(0, "Cannot be negative").optional(),
    discountAmount: z.number().min(1, "Discount must be at least 1").max(1000, "Discount cannot exceed 1000").optional(),
    minimumBill: z.number().min(0, "Minimum Bill cannot be negative").optional(),
    isActive: z.boolean().optional(),
});

module.exports = {
    createRewardSchema,
    updateRewardSchema,
};
