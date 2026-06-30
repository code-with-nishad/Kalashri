const express = require("express");
const router = express.Router();
const { createReview, getPublicReviews, getMyReviews } = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

router.get("/public", getPublicReviews);

// Protected routes
router.use(protect);
router.post("/", createReview);
router.get("/my-reviews", getMyReviews);

module.exports = router;
