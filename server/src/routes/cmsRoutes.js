const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");

const {
    getGallery, createGallery, updateGallery, deleteGallery,
    getCertificates, createCertificate, updateCertificate, deleteCertificate,
    getAchievements, createAchievement, updateAchievement, deleteAchievement,
    getSettings, updateSettings,
    getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
    getOffers, createOffer, updateOffer, deleteOffer,
    getFAQs, createFAQ, updateFAQ, deleteFAQ,
    getAwards, createAward, updateAward, deleteAward,
} = require("../controllers/cmsController");

// PUBLIC ROUTES (No Auth Required)
router.get("/gallery", getGallery);
router.get("/certificates", getCertificates);
router.get("/achievements", getAchievements);
router.get("/settings", getSettings);
router.get("/testimonials", getTestimonials);
router.get("/offers", getOffers);
router.get("/faqs", getFAQs);
router.get("/awards", getAwards);

// TESTIMONIAL SUBMISSION (Protected - user must be logged in to submit a testimonial)
router.post("/testimonials", protect, createTestimonial);

// ADMIN ROUTES (Full CMS Management)
router.use(protect);
router.use(authorize("admin"));

router.post("/gallery", createGallery);
router.put("/gallery/:id", updateGallery);
router.delete("/gallery/:id", deleteGallery);

router.post("/certificates", createCertificate);
router.put("/certificates/:id", updateCertificate);
router.delete("/certificates/:id", deleteCertificate);

router.post("/achievements", createAchievement);
router.put("/achievements/:id", updateAchievement);
router.delete("/achievements/:id", deleteAchievement);

router.put("/settings", updateSettings); // Single unified settings update

router.put("/testimonials/:id", updateTestimonial); // Admin approves/features
router.delete("/testimonials/:id", deleteTestimonial);

router.post("/offers", createOffer);
router.put("/offers/:id", updateOffer);
router.delete("/offers/:id", deleteOffer);

router.post("/faqs", createFAQ);
router.put("/faqs/:id", updateFAQ);
router.delete("/faqs/:id", deleteFAQ);

router.post("/awards", createAward);
router.put("/awards/:id", updateAward);
router.delete("/awards/:id", deleteAward);

module.exports = router;
