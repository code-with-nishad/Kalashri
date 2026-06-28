const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const LoyaltyTransaction = require("../models/LoyaltyTransaction");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const sendResponse = require("../utils/sendResponse");

exports.createOrder = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        throw new AppError("Product not found", 404);
    }

    if (product.stockQuantity < quantity) {
        throw new AppError("Not enough stock available", 400);
    }

    const totalAmount = product.price * quantity;

    const order = await Order.create({
        user: req.user._id,
        product: productId,
        quantity,
        totalAmount,
    });

    sendResponse(res, 201, true, "Product reserved successfully", order);
});

exports.getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
        .populate("product")
        .sort("-createdAt");
        
    sendResponse(res, 200, true, "Orders retrieved successfully", orders);
});

exports.getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
        .populate("user", "firstName lastName email phone")
        .populate("product", "name price image")
        .sort("-createdAt");
        
    sendResponse(res, 200, true, "All orders retrieved successfully", orders);
});

exports.updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId).populate("product").populate("user");
    if (!order) {
        throw new AppError("Order not found", 404);
    }

    // Don't process completed orders again
    if (order.status === "Completed") {
        throw new AppError("Order is already completed", 400);
    }

    order.status = status;

    if (status === "Completed" && !order.pointsAwarded) {
        // Deduct stock
        if (order.product.stockQuantity >= order.quantity) {
            order.product.stockQuantity -= order.quantity;
            await order.product.save();
        }

        // Award Glow Points (1 point per 100)
        const pointsEarned = Math.floor(order.totalAmount / 100);
        
        if (pointsEarned > 0) {
            order.user.glowPoints = (order.user.glowPoints || 0) + pointsEarned;
            order.user.lifetimeGlowPoints = (order.user.lifetimeGlowPoints || 0) + pointsEarned;
            await order.user.save();

            await LoyaltyTransaction.create({
                user: order.user._id,
                type: "Earned",
                points: pointsEarned,
                description: `Purchased product: ${order.product.name}`,
            });
        }
        
        order.pointsAwarded = true;
    }

    await order.save();

    sendResponse(res, 200, true, "Order status updated successfully", order);
});
