const inventoryService = require("../services/inventoryService");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");

exports.getProducts = asyncHandler(async (req, res) => {
    const data = await inventoryService.getProducts();
    sendResponse(res, 200, true, "Products retrieved successfully", data);
});

exports.createProduct = asyncHandler(async (req, res) => {
    const data = await inventoryService.createProduct(req.body);
    sendResponse(res, 201, true, "Product created successfully", data);
});

exports.updateProduct = asyncHandler(async (req, res) => {
    const data = await inventoryService.updateProduct(req.params.id, req.body);
    sendResponse(res, 200, true, "Product updated successfully", data);
});

exports.logTransaction = asyncHandler(async (req, res) => {
    const data = await inventoryService.logTransaction(req.params.id, req.body);
    sendResponse(res, 201, true, "Stock transaction logged", data);
});

exports.getProductHistory = asyncHandler(async (req, res) => {
    const data = await inventoryService.getProductHistory(req.params.id);
    sendResponse(res, 200, true, "Product history retrieved", data);
});
