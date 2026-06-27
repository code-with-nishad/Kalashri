const notificationService = require("../services/notificationService");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");

exports.getUserNotifications = asyncHandler(async (req, res) => {
    const data = await notificationService.getUserNotifications(req.user._id);
    sendResponse(res, 200, true, "Notifications retrieved successfully", data);
});

exports.markAsRead = asyncHandler(async (req, res) => {
    const data = await notificationService.markAsRead(req.user._id, req.params.id);
    sendResponse(res, 200, true, "Notification marked as read", data);
});

exports.markAllAsRead = asyncHandler(async (req, res) => {
    const data = await notificationService.markAllAsRead(req.user._id);
    sendResponse(res, 200, true, data.message, null);
});

exports.deleteNotification = asyncHandler(async (req, res) => {
    const data = await notificationService.deleteNotification(req.user._id, req.params.id);
    sendResponse(res, 200, true, data.message, null);
});
