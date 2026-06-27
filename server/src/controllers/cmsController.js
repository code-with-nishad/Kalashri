const cmsService = require("../services/cmsService");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");

// --- GALLERY ---
exports.getGallery = asyncHandler(async (req, res) => {
    const data = await cmsService.getGallery();
    sendResponse(res, 200, true, "Gallery retrieved successfully", data);
});
exports.createGallery = asyncHandler(async (req, res) => {
    const data = await cmsService.createGallery(req.body);
    sendResponse(res, 201, true, "Gallery item created successfully", data);
});
exports.updateGallery = asyncHandler(async (req, res) => {
    const data = await cmsService.updateGallery(req.params.id, req.body);
    sendResponse(res, 200, true, "Gallery item updated successfully", data);
});
exports.deleteGallery = asyncHandler(async (req, res) => {
    await cmsService.deleteGallery(req.params.id);
    sendResponse(res, 200, true, "Gallery item deleted successfully", null);
});

// --- CERTIFICATES ---
exports.getCertificates = asyncHandler(async (req, res) => {
    const data = await cmsService.getCertificates();
    sendResponse(res, 200, true, "Certificates retrieved successfully", data);
});
exports.createCertificate = asyncHandler(async (req, res) => {
    const data = await cmsService.createCertificate(req.body);
    sendResponse(res, 201, true, "Certificate created successfully", data);
});
exports.updateCertificate = asyncHandler(async (req, res) => {
    const data = await cmsService.updateCertificate(req.params.id, req.body);
    sendResponse(res, 200, true, "Certificate updated successfully", data);
});
exports.deleteCertificate = asyncHandler(async (req, res) => {
    await cmsService.deleteCertificate(req.params.id);
    sendResponse(res, 200, true, "Certificate deleted successfully", null);
});

// --- ACHIEVEMENTS ---
exports.getAchievements = asyncHandler(async (req, res) => {
    const data = await cmsService.getAchievements();
    sendResponse(res, 200, true, "Achievements retrieved successfully", data);
});
exports.createAchievement = asyncHandler(async (req, res) => {
    const data = await cmsService.createAchievement(req.body);
    sendResponse(res, 201, true, "Achievement created successfully", data);
});
exports.updateAchievement = asyncHandler(async (req, res) => {
    const data = await cmsService.updateAchievement(req.params.id, req.body);
    sendResponse(res, 200, true, "Achievement updated successfully", data);
});
exports.deleteAchievement = asyncHandler(async (req, res) => {
    await cmsService.deleteAchievement(req.params.id);
    sendResponse(res, 200, true, "Achievement deleted successfully", null);
});

// --- SETTINGS ---
exports.getSettings = asyncHandler(async (req, res) => {
    const data = await cmsService.getSettings();
    sendResponse(res, 200, true, "Settings retrieved successfully", data);
});
exports.updateSettings = asyncHandler(async (req, res) => {
    const data = await cmsService.updateSettings(req.body);
    sendResponse(res, 200, true, "Settings updated successfully", data);
});

// --- TESTIMONIALS ---
exports.getTestimonials = asyncHandler(async (req, res) => {
    const data = await cmsService.getTestimonials();
    sendResponse(res, 200, true, "Testimonials retrieved successfully", data);
});
exports.createTestimonial = asyncHandler(async (req, res) => {
    const data = await cmsService.createTestimonial(req.body);
    sendResponse(res, 201, true, "Testimonial submitted successfully", data);
});
exports.updateTestimonial = asyncHandler(async (req, res) => {
    const data = await cmsService.updateTestimonial(req.params.id, req.body);
    sendResponse(res, 200, true, "Testimonial updated successfully", data);
});
exports.deleteTestimonial = asyncHandler(async (req, res) => {
    await cmsService.deleteTestimonial(req.params.id);
    sendResponse(res, 200, true, "Testimonial deleted successfully", null);
});

// --- OFFERS ---
exports.getOffers = asyncHandler(async (req, res) => {
    const data = await cmsService.getOffers();
    sendResponse(res, 200, true, "Offers retrieved successfully", data);
});
exports.createOffer = asyncHandler(async (req, res) => {
    const data = await cmsService.createOffer(req.body);
    sendResponse(res, 201, true, "Offer created successfully", data);
});
exports.updateOffer = asyncHandler(async (req, res) => {
    const data = await cmsService.updateOffer(req.params.id, req.body);
    sendResponse(res, 200, true, "Offer updated successfully", data);
});
exports.deleteOffer = asyncHandler(async (req, res) => {
    await cmsService.deleteOffer(req.params.id);
    sendResponse(res, 200, true, "Offer deleted successfully", null);
});

// --- FAQS ---
exports.getFAQs = asyncHandler(async (req, res) => {
    const data = await cmsService.getFAQs();
    sendResponse(res, 200, true, "FAQs retrieved successfully", data);
});
exports.createFAQ = asyncHandler(async (req, res) => {
    const data = await cmsService.createFAQ(req.body);
    sendResponse(res, 201, true, "FAQ created successfully", data);
});
exports.updateFAQ = asyncHandler(async (req, res) => {
    const data = await cmsService.updateFAQ(req.params.id, req.body);
    sendResponse(res, 200, true, "FAQ updated successfully", data);
});
exports.deleteFAQ = asyncHandler(async (req, res) => {
    await cmsService.deleteFAQ(req.params.id);
    sendResponse(res, 200, true, "FAQ deleted successfully", null);
});
