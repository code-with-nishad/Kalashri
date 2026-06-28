const express = require("express");
const router = express.Router();
const {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus
} = require("../controllers/orderController");
const { protect, authorize } = require("../middleware/authMiddleware");

// All routes require authentication
router.use(protect);

// Customer routes
router.post("/", createOrder);
router.get("/my-orders", getUserOrders);

// Admin routes
router.use(authorize("admin"));
router.get("/", getAllOrders);
router.put("/:orderId/status", updateOrderStatus);

module.exports = router;
