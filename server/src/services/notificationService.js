const Notification = require("../models/Notification");
const AppError = require("../utils/AppError");

exports.getUserNotifications = async (userId) => {
    return Notification.find({ user: userId }).sort("-createdAt").limit(50);
};

exports.markAsRead = async (userId, notificationId) => {
    const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, user: userId },
        { isRead: true },
        { new: true }
    );
    if (!notification) throw new AppError("Notification not found", 404);
    return notification;
};

exports.markAllAsRead = async (userId) => {
    await Notification.updateMany({ user: userId, isRead: false }, { isRead: true });
    return { success: true, message: "All notifications marked as read" };
};

exports.deleteNotification = async (userId, notificationId) => {
    const notification = await Notification.findOneAndDelete({ _id: notificationId, user: userId });
    if (!notification) throw new AppError("Notification not found", 404);
    return { success: true, message: "Notification deleted" };
};

exports.createNotification = async (userId, type, title, message) => {
    return Notification.create({
        user: userId,
        type,
        title,
        message,
    });
};
