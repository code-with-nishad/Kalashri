const { z } = require("zod");

const gallerySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    image: z.string().url("Must be a valid URL"),
    category: z.enum([
        "Facial",
        "Hair",
        "Hair Color",
        "Hair Spa",
        "Waxing",
        "Threading",
        "Bridal",
        "Nails",
        "Skin",
        "Other",
    ]),
    featured: z.boolean().optional(),
    isActive: z.boolean().optional(),
});

const certificateSchema = z.object({
    title: z.string().min(1, "Title is required"),
    organization: z.string().min(1, "Organization is required"),
    issueDate: z.coerce.date(),
    certificateImage: z.string().url("Must be a valid URL"),
    description: z.string().optional(),
    featured: z.boolean().optional(),
    isActive: z.boolean().optional(),
});

const achievementSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    year: z.number().int().min(1900).max(2100),
    image: z.string().optional(),
    category: z.enum(["Award", "Achievement", "Certificate", "Trophy", "Milestone", "Media"]),
    featured: z.boolean().optional(),
});

const settingSchema = z.object({
    general: z.object({
        salonName: z.string().optional(),
        logo: z.string().optional(),
        about: z.string().optional(),
        mission: z.string().optional(),
        vision: z.string().optional(),
    }).optional(),
    hero: z.object({
        title: z.string().optional(),
        subtitle: z.string().optional(),
        image: z.string().optional(),
        video: z.string().optional(),
        primaryButtonText: z.string().optional(),
        primaryButtonLink: z.string().optional(),
        secondaryButtonText: z.string().optional(),
        secondaryButtonLink: z.string().optional(),
        bgImage: z.string().optional(),
    }).optional(),
    contact: z.object({
        phone: z.string().optional(),
        email: z.string().email().optional().or(z.literal("")),
        whatsapp: z.string().optional(),
        emergencyNumber: z.string().optional(),
        address: z.string().optional(),
        mapLink: z.string().optional(),
        instagram: z.string().optional(),
        facebook: z.string().optional(),
        youtube: z.string().optional(),
    }).optional(),
    businessHours: z.record(z.object({
        isOpen: z.boolean(),
        openTime: z.string(),
        closeTime: z.string(),
    })).optional(),
});

const testimonialSchema = z.object({
    customerName: z.string().min(1, "Name is required"),
    rating: z.number().min(1).max(5),
    review: z.string().min(1, "Review is required"),
    customerImage: z.string().optional(),
    approved: z.boolean().optional(),
    featured: z.boolean().optional(),
});

const offerSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    bannerImage: z.string().optional(),
    discountText: z.string().min(1, "Discount text is required"),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    active: z.boolean().optional(),
});

const faqSchema = z.object({
    question: z.string().min(1, "Question is required"),
    answer: z.string().min(1, "Answer is required"),
    order: z.number().int().optional(),
    active: z.boolean().optional(),
});

module.exports = {
    gallerySchema,
    certificateSchema,
    achievementSchema,
    settingSchema,
    testimonialSchema,
    offerSchema,
    faqSchema,
};
