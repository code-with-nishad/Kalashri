const express = require("express");
const router = express.Router();
const {
    getPosts,
    createPost,
    toggleLike,
    createComment,
    getComments,
    deletePost,
    getAdminModerationQueue,
    moderatePost,
    getTrendingInfo,
} = require("../controllers/glowFeedController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Protected routes (any logged-in user)
router.use(protect);

router.get("/", getPosts);
router.post("/", createPost);
router.post("/:id/like", toggleLike);
router.get("/:id/comments", getComments);
router.post("/:id/comments", createComment);
router.delete("/:id", deletePost);
router.get("/trending", getTrendingInfo);

// Admin-only moderation routes
router.get("/admin/moderation", authorize("admin"), getAdminModerationQueue);
router.patch("/admin/moderation/:id", authorize("admin"), moderatePost);

module.exports = router;
