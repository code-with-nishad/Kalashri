const activityService = require("../services/activityService");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");

exports.getRecentActivities = asyncHandler(async (req, res) => {
    const data = await activityService.getRecentActivities();
    sendResponse(res, 200, true, "Activities retrieved successfully", data);
});
