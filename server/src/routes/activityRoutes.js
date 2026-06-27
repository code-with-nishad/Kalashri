const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const { getRecentActivities } = require("../controllers/activityController");

router.use(protect);
router.use(authorize("admin"));

router.get("/", getRecentActivities);

module.exports = router;
