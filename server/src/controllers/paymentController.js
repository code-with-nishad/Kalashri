const paymentService = require("../services/paymentService");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");

exports.createCheckoutSession = asyncHandler(async (req, res) => {
    const data = await paymentService.createCheckoutSession(req.params.appointmentId, req.user._id);
    sendResponse(res, 200, true, "Checkout session created", data);
});

exports.handleWebhook = asyncHandler(async (req, res) => {
    // Stripe webhooks need raw body, make sure this route receives express.raw() in server.js
    const signature = req.headers["stripe-signature"];
    await paymentService.handleWebhook(req.body, signature);
    res.status(200).send("Received");
});
