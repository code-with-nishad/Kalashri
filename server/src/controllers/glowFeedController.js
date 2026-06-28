const GlowPost = require("../models/GlowPost");
const GlowComment = require("../models/GlowComment");
const Service = require("../models/Service");
const User = require("../models/User");
const UserJourney = require("../models/UserJourney");
const journeyService = require("../services/journeyService");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");
const AppError = require("../utils/AppError");

// Helper to evaluate if text content is safe
const checkContentSafetyWithAI = async (text) => {
    if (!process.env.GROQ_API_KEY) return true; // fallback if no key
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "system",
                        content: "You are a content moderation assistant. Analyze the user post caption and return exactly 'SAFE' or 'UNSAFE'. Unsafe includes spam, hate speech, explicit content, violence, and severe insults. Return ONLY the single word."
                    },
                    { role: "user", content: text }
                ],
                temperature: 0.1,
                max_tokens: 10
            })
        });
        if (response.ok) {
            const data = await response.json();
            const result = data.choices[0].message.content.trim().toUpperCase();
            return result === "SAFE";
        }
    } catch (e) {
        console.error("AI Moderation failed:", e);
    }
    return true; // fail safe
};

// Helper to get AI Beauty Recommendations
const getAIBeautyRecommendations = async (text, services) => {
    if (!process.env.GROQ_API_KEY) return null;
    try {
        const serviceListStr = services
            .map((s) => `- ${s.name} (ID: ${s._id})`)
            .join("\n");

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "system",
                        content: `You are an AI beauty consultant. Analyze the caption describing a client's salon look or skin concern.
Recommend up to 3 services from the following list and suggest a brief, premium routine advice.
List of available services:
${serviceListStr}

Return a valid JSON object matching this structure:
{
  "recommendedServiceIds": ["id1", "id2"],
  "routineAdvice": "Brief haircare/skincare advice tailored to their caption."
}
Return ONLY valid JSON. No markdown blocks, no explanation text.`
                    },
                    { role: "user", content: text }
                ],
                temperature: 0.5,
                max_tokens: 400
            })
        });
        if (response.ok) {
            const data = await response.json();
            const content = data.choices[0].message.content.trim();
            // strip potential markdown wrapper if LLM didn't listen
            const cleanJson = content.replace(/^```json|```$/g, "").trim();
            return JSON.parse(cleanJson);
        }
    } catch (e) {
        console.error("AI Recommendation failed:", e);
    }
    return null;
};

// GET /api/feed - get all posts
exports.getPosts = asyncHandler(async (req, res) => {
    const { filter, tag, search } = req.query;
    let query = {};

    // Normal users see only Approved posts, admins see all for moderation
    if (req.user.role !== "admin") {
        query.status = "Approved";
    }

    if (filter === "featured") {
        query.isFeatured = true;
    }

    if (tag) {
        // Tag could be service ID or word matching caption
        query.$or = [
            { services: tag },
            { customServices: { $in: [tag] } },
            { caption: new RegExp(tag, "i") }
        ];
    }

    if (search) {
        query.$or = [
            { caption: new RegExp(search, "i") },
            { customServices: { $in: [search] } }
        ];
    }

    // Sort pinned posts first, then newest
    const posts = await GlowPost.find(query)
        .populate("user", "firstName lastName avatar membership glowPoints")
        .populate("services", "name category duration price")
        .sort({ isPinned: -1, createdAt: -1 });

    sendResponse(res, 200, true, "Posts retrieved successfully", posts);
});

// POST /api/feed - create a post
exports.createPost = asyncHandler(async (req, res) => {
    const { caption, images, beforeImage, afterImage, isBeforeAfter, services, customServices, stylist } = req.body;

    if (!caption) {
        throw new AppError("Caption is required", 400);
    }

    // Enforce 3 posts per day upload limit
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const postCountToday = await GlowPost.countDocuments({
        user: req.user._id,
        createdAt: { $gte: startOfToday, $lte: endOfToday }
    });

    if (postCountToday >= 3) {
        throw new AppError("Daily upload limit reached (maximum 3 posts per day)", 400);
    }

    // AI Moderation check
    const isSafe = await checkContentSafetyWithAI(caption);
    const status = isSafe ? "Approved" : "Pending";

    const post = await GlowPost.create({
        user: req.user._id,
        caption,
        images: images || [],
        beforeImage: beforeImage || "",
        afterImage: afterImage || "",
        isBeforeAfter: !!isBeforeAfter,
        services: services || [],
        customServices: customServices || [],
        stylist: stylist || "",
        status,
    });

    // Auto-reward Beauty Journey XP immediately on safe post
    let xpGained = 0;
    if (status === "Approved") {
        // Find if this is user's first post
        const previousPosts = await GlowPost.countDocuments({ user: req.user._id, status: "Approved" });
        
        let rewardXp = 20; // Default first post or text post
        let milestoneLabel = "First Post";

        if (previousPosts > 1) {
            rewardXp = isBeforeAfter ? 40 : 15;
            milestoneLabel = isBeforeAfter ? "Transformation Transformation Uploaded" : "Shared a look";
        }

        // Add XP to user journey
        try {
            const journey = await UserJourney.findOne({ user: req.user._id });
            if (journey) {
                journey.totalXp += rewardXp;
                // Add milestone
                const exists = journey.milestones.some((m) => m.type === "glowfeed_post" && m.label === milestoneLabel);
                if (!exists) {
                    journey.milestones.unshift({ type: "glowfeed_post", label: milestoneLabel, at: new Date() });
                }
                await journey.save();
                xpGained = rewardXp;
            }
        } catch (err) {
            console.error("Failed to reward beauty journey XP:", err);
        }
    }

    // AI recommendations matching caption
    let aiRec = null;
    if (status === "Approved") {
        const allServices = await Service.find({ isActive: true });
        aiRec = await getAIBeautyRecommendations(caption, allServices);
    }

    sendResponse(res, 201, true, status === "Approved" ? "Post shared successfully! ✨" : "Post submitted for moderation", {
        post,
        xpGained,
        aiRec
    });
});

// POST /api/feed/:id/like - toggle upvote/like
exports.toggleLike = asyncHandler(async (req, res) => {
    const post = await GlowPost.findById(req.params.id);
    if (!post) {
        throw new AppError("Post not found", 404);
    }

    const likeIdx = post.likes.indexOf(req.user._id);
    let liked = false;
    if (likeIdx > -1) {
        post.likes.splice(likeIdx, 1);
    } else {
        post.likes.push(req.user._id);
        liked = true;

        // Reward 10 XP if user reaches 5 likes on their post (gamification)
        if (post.likes.length === 5) {
            try {
                const journey = await UserJourney.findOne({ user: post.user });
                if (journey) {
                    journey.totalXp += 10;
                    journey.milestones.unshift({ type: "likes_milestone", label: "Post reached 5 likes!", at: new Date() });
                    await journey.save();
                }
            } catch (err) {
                console.error("Milestone reward failed", err);
            }
        }
    }

    await post.save();
    sendResponse(res, 200, true, liked ? "Post upvoted ❤️" : "Upvote removed", { likesCount: post.likes.length, liked });
});

// POST /api/feed/:id/comments - add a comment
exports.createComment = asyncHandler(async (req, res) => {
    const { text } = req.body;
    if (!text) {
        throw new AppError("Comment text is required", 400);
    }

    const post = await GlowPost.findById(req.params.id);
    if (!post) {
        throw new AppError("Post not found", 404);
    }

    const comment = await GlowComment.create({
        post: post._id,
        user: req.user._id,
        text,
    });

    const populated = await GlowComment.findById(comment._id).populate("user", "firstName lastName avatar membership");

    sendResponse(res, 201, true, "Comment added successfully", populated);
});

// GET /api/feed/:id/comments - get comments
exports.getComments = asyncHandler(async (req, res) => {
    const comments = await GlowComment.find({ post: req.params.id })
        .populate("user", "firstName lastName avatar membership")
        .sort({ createdAt: 1 });

    sendResponse(res, 200, true, "Comments retrieved successfully", comments);
});

// DELETE /api/feed/:id - delete a post
exports.deletePost = asyncHandler(async (req, res) => {
    const post = await GlowPost.findById(req.params.id);
    if (!post) {
        throw new AppError("Post not found", 404);
    }

    // Owner or Admin only
    if (post.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
        throw new AppError("Not authorized to delete this post", 403);
    }

    await GlowPost.findByIdAndDelete(req.params.id);
    await GlowComment.deleteMany({ post: req.params.id });

    sendResponse(res, 200, true, "Post deleted successfully", null);
});

// GET /api/feed/admin/moderation - Admin moderate posts queue
exports.getAdminModerationQueue = asyncHandler(async (req, res) => {
    const posts = await GlowPost.find({ status: "Pending" })
        .populate("user", "firstName lastName avatar email phone")
        .sort({ createdAt: -1 });

    sendResponse(res, 200, true, "Moderation queue retrieved", posts);
});

// PATCH /api/feed/admin/:id/status - moderate a post
exports.moderatePost = asyncHandler(async (req, res) => {
    const { status, isFeatured, isPinned } = req.body;
    const post = await GlowPost.findById(req.params.id);
    if (!post) {
        throw new AppError("Post not found", 404);
    }

    if (status) post.status = status;
    if (isFeatured !== undefined) post.isFeatured = isFeatured;
    if (isPinned !== undefined) post.isPinned = isPinned;

    await post.save();
    sendResponse(res, 200, true, `Post updated status to ${post.status}`, post);
});

// GET /api/feed/trending - return trending hashtags or services based on popular tags
exports.getTrendingInfo = asyncHandler(async (req, res) => {
    const activeServices = await Service.find({ isActive: true }).limit(5);
    
    // Create static/dynamic list of trending items to present to user matching mock
    const trending = [
        { name: "Butterfly Haircut", posts: 125, category: "Hair Care" },
        { name: "Korean Glass Skin", posts: 98, category: "Skin Care" },
        { name: "French Nails", posts: 87, category: "Nail Art" },
        { name: "Hair Color Trends", posts: 76, category: "Hair Care" },
        { name: "Bridal Makeup", posts: 64, category: "Makeup" },
    ];

    const challenge = {
        title: "Summer Hair Glow",
        description: "Post your best summer hair look and win exciting rewards!",
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 30 * 60 * 1000), // 5d 12h 30m
    };

    const topStars = await User.find({ role: "customer" })
        .select("firstName lastName avatar membership glowPoints")
        .sort({ glowPoints: -1 })
        .limit(5);

    sendResponse(res, 200, true, "Trending info retrieved", { trending, challenge, topStars });
});
