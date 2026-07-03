const adminService = require("../services/adminService");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");
const sendToken = require("../utils/sendToken");

const registerAdmin = asyncHandler(async (req, res) => {
    const admin = await adminService.registerAdmin(req.body);
    // Use existing sendToken method from auth module if needed, or just standard response
    sendToken(admin, 201, "Admin registered successfully", res);
});

const getDashboardStats = asyncHandler(async (req, res) => {
    const stats = await adminService.getDashboardStats();
    sendResponse(res, 200, true, "Dashboard stats retrieved successfully", stats);
});

const getCustomers = asyncHandler(async (req, res) => {
    const data = await adminService.getCustomers(req.query);
    sendResponse(res, 200, true, "Customers retrieved successfully", data);
});

const getCustomerDetails = asyncHandler(async (req, res) => {
    const details = await adminService.getCustomerDetails(req.params.id);
    sendResponse(res, 200, true, "Customer details retrieved successfully", details);
});

const updateCustomerNotes = asyncHandler(async (req, res) => {
    const customer = await adminService.updateCustomerNotes(req.params.id, req.body);
    sendResponse(res, 200, true, "Customer notes updated successfully", customer);
});

const getAnalytics = asyncHandler(async (req, res) => {
    const analytics = await adminService.getAnalytics();
    sendResponse(res, 200, true, "Analytics retrieved successfully", analytics);
});

const getDashboardWidgets = asyncHandler(async (req, res) => {
    const widgets = await adminService.getDashboardWidgets();
    sendResponse(res, 200, true, "Dashboard widgets retrieved successfully", widgets);
});

module.exports = {
    registerAdmin,
    getDashboardStats,
    getCustomers,
    getCustomerDetails,
    updateCustomerNotes,
    getAnalytics,
    getDashboardWidgets,
};
