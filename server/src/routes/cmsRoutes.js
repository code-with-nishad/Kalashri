const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");

const {
    getGallery, createGallery, updateGallery, deleteGallery,
    getSettings, updateSettings,
    getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
    getOffers, createOffer, updateOffer, deleteOffer,
    getFAQs, createFAQ, updateFAQ, deleteFAQ,
} = require("../controllers/cmsController");

// PUBLIC ROUTES
router.get("/gallery", getGallery);
router.get("/settings", getSettings);
router.get("/testimonials", getTestimonials);
router.get("/offers", getOffers);
router.get("/faqs", getFAQs);

// TESTIMONIAL SUBMISSION
router.post("/testimonials", protect, createTestimonial);

// ADMIN ROUTES
router.use(protect);
router.use(authorize("admin"));

router.post("/gallery", createGallery);
router.put("/gallery/:id", updateGallery);
router.delete("/gallery/:id", deleteGallery);

router.put("/settings", updateSettings);

router.put("/testimonials/:id", updateTestimonial);
router.delete("/testimonials/:id", deleteTestimonial);

router.post("/offers", createOffer);
router.put("/offers/:id", updateOffer);
router.delete("/offers/:id", deleteOffer);

router.post("/faqs", createFAQ);
router.put("/faqs/:id", updateFAQ);
router.delete("/faqs/:id", deleteFAQ);

module.exports = router;
