const express = require("express");
const router = express.Router();

const {
    createReward,
    updateReward,
    deleteReward,
    getActiveRewards,
    redeemReward,
    getMyRedemptionHistory,
    getAllRedemptions,
    updateRedemptionStatus,
} = require("../controllers/rewardController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Public routes (anyone can see active rewards)
router.get("/", getActiveRewards);

// Customer routes
router.use(protect);
router.post("/redeem/:rewardId", redeemReward);
router.post("/:rewardId/redeem", redeemReward);
router.get("/history", getMyRedemptionHistory);
router.get("/my-redemptions", getMyRedemptionHistory);

// Admin routes
router.use(authorize("admin"));
router.get("/redemptions", getAllRedemptions);
router.patch("/redemptions/:id/status", updateRedemptionStatus);
router.post("/", createReward);
router.put("/:id", updateReward);
router.delete("/:id", deleteReward);

module.exports = router;
