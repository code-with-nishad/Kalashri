const Stripe = require("stripe");
const Appointment = require("../models/Appointment");
const AppError = require("../utils/AppError");

// Initialize Stripe with the secret key from environment variables
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock");

exports.createCheckoutSession = async (appointmentId, userId) => {
    const appointment = await Appointment.findById(appointmentId).populate("customer", "email firstName");
    if (!appointment) throw new AppError("Appointment not found", 404);

    if (appointment.customer._id.toString() !== userId.toString()) {
        throw new AppError("Not authorized to pay for this appointment", 403);
    }

    if (appointment.paymentStatus === "Paid") {
        throw new AppError("Appointment is already paid", 400);
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd", // Default to USD or INR based on salon location
                    product_data: {
                        name: "Salon Appointment Payment",
                        description: `Services: ${appointment.services.map(s => s.serviceName).join(", ")}`,
                    },
                    unit_amount: appointment.totalAmount * 100, // Stripe expects amounts in cents/paise
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/appointments/${appointment._id}/success`,
        cancel_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/appointments/${appointment._id}/cancel`,
        customer_email: appointment.customer.email,
        client_reference_id: appointment._id.toString(),
    });

    return { url: session.url };
};

exports.handleWebhook = async (payload, signature) => {
    let event;
    try {
        const secret = process.env.STRIPE_WEBHOOK_SECRET || "whsec_mock";
        event = stripe.webhooks.constructEvent(payload, signature, secret);
    } catch (err) {
        throw new AppError(`Webhook Error: ${err.message}`, 400);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const appointmentId = session.client_reference_id;

        const appointment = await Appointment.findById(appointmentId);
        if (appointment) {
            appointment.paymentStatus = "Paid";
            appointment.paymentMethod = "Card";
            await appointment.save();
        }
    }

    return true;
};
