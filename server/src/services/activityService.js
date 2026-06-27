const Activity = require("../models/Activity");

exports.logActivity = async (type, title, description, userId = null, createdBy = null, metadata = {}) => {
    try {
        await Activity.create({
            type,
            title,
            description,
            user: userId,
            createdBy,
            metadata,
        });
    } catch (error) {
        console.error("Failed to log activity:", error);
    }
};

exports.getRecentActivities = async () => {
    return Activity.find()
        .populate("user", "firstName lastName email")
        .populate("createdBy", "firstName lastName email")
        .sort("-createdAt")
        .limit(100);
};
