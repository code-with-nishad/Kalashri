const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const { upload } = require("../utils/cloudinary");
const { uploadImage } = require("../controllers/uploadController");

// Protected upload route (Admin only)
router.use(protect);
router.use(authorize("admin"));

// Expecting form-data with field name "image"
router.post("/", upload.single("image"), uploadImage);

module.exports = router;
