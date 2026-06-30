const visitorService = require("../services/visitorService");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");

exports.trackVisitor = asyncHandler(async (req, res) => {
    const visitor = await visitorService.trackVisitor(req.body);
    sendResponse(res, 200, true, "Visitor tracked successfully", visitor);
});

exports.trackEvent = asyncHandler(async (req, res) => {
    const { visitorId, eventType, eventData } = req.body;
    const visitor = await visitorService.trackEvent(visitorId, eventType, eventData);
    sendResponse(res, 200, true, "Event tracked successfully", visitor);
});

exports.updateTimeSpent = asyncHandler(async (req, res) => {
    const { visitorId, timeSpent } = req.body;
    const visitor = await visitorService.updateTimeSpent(visitorId, timeSpent);
    sendResponse(res, 200, true, "Time spent updated successfully", visitor);
});

exports.getAnalytics = asyncHandler(async (req, res) => {
    const analytics = await visitorService.getVisitorAnalytics(req.query);
    sendResponse(res, 200, true, "Visitor analytics retrieved successfully", analytics);
});

exports.getVisitorsList = asyncHandler(async (req, res) => {
    const data = await visitorService.getVisitorsList(req.query);
    sendResponse(res, 200, true, "Visitors list retrieved successfully", data);
});

exports.getVisitorDetails = asyncHandler(async (req, res) => {
    const visitor = await visitorService.getVisitorDetails(req.params.id);
    sendResponse(res, 200, true, "Visitor details retrieved successfully", visitor);
});

exports.getRegistrationFunnel = asyncHandler(async (req, res) => {
    const funnel = await visitorService.getRegistrationFunnel();
    sendResponse(res, 200, true, "Registration funnel retrieved successfully", funnel);
});
