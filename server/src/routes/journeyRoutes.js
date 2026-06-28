const express = require("express");
const { getMyJourney } = require("../controllers/journeyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", protect, getMyJourney);

module.exports = router;
