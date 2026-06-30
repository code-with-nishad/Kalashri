const express = require("express");
const router = express.Router();
const {
    trackVisitor,
    trackEvent,
    updateTimeSpent,
    getAnalytics,
    getVisitorsList,
    getVisitorDetails,
    getRegistrationFunnel,
} = require("../controllers/visitorController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public endpoints for visitor tracking (no auth required)
router.post("/track", trackVisitor);
router.post("/event", trackEvent);
router.post("/time-spent", updateTimeSpent);

// Admin-only endpoints for analytics
router.use(protect);
router.use(authorize("admin"));

router.get("/analytics", getAnalytics);
router.get("/list", getVisitorsList);
router.get("/:id", getVisitorDetails);
router.get("/funnel/registration", getRegistrationFunnel);

module.exports = router;
