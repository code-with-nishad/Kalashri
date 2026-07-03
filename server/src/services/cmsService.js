const Gallery = require("../models/Gallery");
const Setting = require("../models/Setting");
const Testimonial = require("../models/Testimonial");
const Offer = require("../models/Offer");
const FAQ = require("../models/FAQ");

const {
    gallerySchema,
    settingSchema,
    testimonialSchema,
    offerSchema,
    faqSchema,
} = require("../validations/cmsValidation");

// --- GALLERY ---
exports.getGallery = async () => Gallery.find({ isActive: true }).sort("-createdAt");
exports.createGallery = async (data) => {
    const validated = gallerySchema.parse(data);
    return Gallery.create(validated);
};
exports.updateGallery = async (id, data) => {
    const validated = gallerySchema.partial().parse(data);
    return Gallery.findByIdAndUpdate(id, validated, { returnDocument: "after" });
};
exports.deleteGallery = async (id) => Gallery.findByIdAndDelete(id);

// --- SETTINGS ---
exports.getSettings = async () => {
    let setting = await Setting.findOne();
    if (!setting) {
        setting = await Setting.create({});
    }
    return setting;
};
exports.updateSettings = async (data) => {
    const validated = settingSchema.partial().parse(data);
    let setting = await Setting.findOne();
    if (!setting) {
        return Setting.create(validated);
    }
    return Setting.findByIdAndUpdate(setting._id, validated, { returnDocument: "after" });
};

// --- TESTIMONIALS / REVIEWS ---
exports.getTestimonials = async () => Testimonial.find({ approved: true }).sort("-createdAt");
exports.createTestimonial = async (data) => {
    const validated = testimonialSchema.parse(data);
    return Testimonial.create(validated);
};
exports.updateTestimonial = async (id, data) => {
    const validated = testimonialSchema.partial().parse(data);
    return Testimonial.findByIdAndUpdate(id, validated, { returnDocument: "after" });
};
exports.deleteTestimonial = async (id) => Testimonial.findByIdAndDelete(id);

// --- OFFERS ---
exports.getOffers = async () => Offer.find({ active: true, endDate: { $gte: new Date() } }).sort("endDate");
exports.createOffer = async (data) => {
    const validated = offerSchema.parse(data);
    return Offer.create(validated);
};
exports.updateOffer = async (id, data) => {
    const validated = offerSchema.partial().parse(data);
    return Offer.findByIdAndUpdate(id, validated, { returnDocument: "after" });
};
exports.deleteOffer = async (id) => Offer.findByIdAndDelete(id);

// --- FAQS ---
exports.getFAQs = async () => FAQ.find({ active: true }).sort("order");
exports.createFAQ = async (data) => {
    const validated = faqSchema.parse(data);
    return FAQ.create(validated);
};
exports.updateFAQ = async (id, data) => {
    const validated = faqSchema.partial().parse(data);
    return FAQ.findByIdAndUpdate(id, validated, { returnDocument: "after" });
};
exports.deleteFAQ = async (id) => FAQ.findByIdAndDelete(id);
