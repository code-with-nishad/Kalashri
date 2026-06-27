const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");

const {
    registerAdmin,
    getDashboardStats,
    getCustomers,
    getCustomerDetails,
    updateCustomerNotes,
    manageGlowPoints,
    getAnalytics,
    getLeaderboard,
    manageLeaderboardVisibility,
    resetMonthlyLeaderboard,
    getDashboardWidgets,
} = require("../controllers/adminController");

// Public (Only protected by ADMIN_SECRET in the body)
router.post("/register", registerAdmin);

// All subsequent routes require Admin auth
router.use(protect);
router.use(authorize("admin"));

// Dashboard & Analytics
router.get("/dashboard", getDashboardStats);
router.get("/dashboard/widgets", getDashboardWidgets);
router.get("/analytics", getAnalytics);

// Customers
router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomerDetails);
router.patch("/customers/:id/notes", updateCustomerNotes);
router.patch("/customers/:id/glow-points", manageGlowPoints);

// Leaderboard
router.get("/leaderboard", getLeaderboard);
router.patch("/customers/:id/leaderboard", manageLeaderboardVisibility);
router.post("/leaderboard/reset", resetMonthlyLeaderboard);

module.exports = router;
