const FashionOrder = require("../models/FashionOrder");

exports.createOrder = async (req, res) => {
    try {
        const order = await FashionOrder.create(req.body);
        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await FashionOrder.find().populate("customer", "firstName lastName phone email").populate("measurements");
        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await FashionOrder.findById(req.params.id).populate("customer").populate("measurements");
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await FashionOrder.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await FashionOrder.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
