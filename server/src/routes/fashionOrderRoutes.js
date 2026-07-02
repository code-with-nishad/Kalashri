const express = require("express");
const { createOrder, getOrders, getOrder, updateOrder, deleteOrder } = require("../controllers/fashionOrderController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
    .post(protect, createOrder)
    .get(protect, authorize("admin"), getOrders);

router.route("/:id")
    .get(protect, getOrder)
    .put(protect, authorize("admin"), updateOrder)
    .delete(protect, authorize("admin"), deleteOrder);

module.exports = router;
