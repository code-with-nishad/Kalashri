const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createCheckoutSession, handleWebhook } = require("../controllers/paymentController");

// Webhook must be raw body, so we will handle its parser configuration in server.js before JSON parsers.
router.post("/webhook", express.raw({ type: 'application/json' }), handleWebhook);

// Protected routes
router.use(express.json());
router.use(protect);
router.post("/create-checkout-session/:appointmentId", createCheckoutSession);

module.exports = router;
