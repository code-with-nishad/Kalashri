const journeyService = require("../services/journeyService");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");

exports.getMyJourney = asyncHandler(async (req, res) => {
    const data = await journeyService.getMyJourney(req.user._id);
    sendResponse(res, 200, true, "Beauty journey retrieved successfully", data);
});
