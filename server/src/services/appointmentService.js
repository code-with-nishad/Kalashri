const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const LoyaltyTransaction = require("../models/LoyaltyTransaction");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const notificationService = require("./notificationService");
const emailService = require("../utils/emailService");
const { createAppointmentSchema, updateAppointmentStatusSchema } = require("../validations/appointmentValidation");

const bookAppointment = async (userId, appointmentData) => {
    // Validate request data
    const validationResult = createAppointmentSchema.safeParse(appointmentData);
    if (!validationResult.success) {
        const errors = validationResult.error.errors.map((err) => err.message).join(", ");
        throw new AppError(errors, 400);
    }

    const { serviceIds, appointmentDate, appointmentTime, notes } = validationResult.data;

    // Fetch all services
    const services = await Service.find({ _id: { $in: serviceIds }, isActive: true });

    if (services.length !== serviceIds.length) {
        throw new AppError("One or more services are invalid or unavailable", 400);
    }

    let totalAmount = 0;
    let totalDuration = 0;
    const servicesSnapshot = [];

    // Calculate totals and prepare snapshot
    services.forEach((service) => {
        totalAmount += service.price;
        totalDuration += service.duration;

        servicesSnapshot.push({
            service: service._id,
            serviceName: service.name,
            price: service.price,
            duration: service.duration,
        });
    });

    // Create appointment
    const appointment = await Appointment.create({
        customer: userId,
        services: servicesSnapshot,
        appointmentDate,
        appointmentTime,
        totalAmount,
        totalDuration,
        notes,
    });

    return appointment;
};

const getCustomerAppointments = async (userId) => {
    const appointments = await Appointment.find({ customer: userId }).sort("-createdAt");
    return appointments;
};

const getSingleAppointment = async (appointmentId, user) => {
    const appointment = await Appointment.findById(appointmentId).populate("customer", "firstName lastName email phone");

    if (!appointment) {
        throw new AppError("Appointment not found", 404);
    }

    // Customer can only see their own appointment, Admin sees everything
    if (user.role !== "admin" && appointment.customer._id.toString() !== user._id.toString()) {
        throw new AppError("Not authorized to view this appointment", 403);
    }

    return appointment;
};

const getAllAppointments = async () => {
    const appointments = await Appointment.find()
        .populate("customer", "firstName lastName email phone")
        .sort("-createdAt");
    return appointments;
};

const updateAppointmentStatus = async (appointmentId, updateData) => {
    // Validate request data
    const validationResult = updateAppointmentStatusSchema.safeParse(updateData);
    if (!validationResult.success) {
        const errors = validationResult.error.errors.map((err) => err.message).join(", ");
        throw new AppError(errors, 400);
    }

    const { status, paymentStatus, paymentMethod, suggestedTimeFrame } = validationResult.data;

    const appointment = await Appointment.findById(appointmentId).populate("customer", "firstName lastName email phone");

    if (!appointment) {
        throw new AppError("Appointment not found", 404);
    }

    const previousStatus = appointment.status;

    // Prevent re-awarding points if it's already completed
    const wasAlreadyCompleted = appointment.status === "Completed";

    // Update fields
    if (status) appointment.status = status;
    if (paymentStatus) appointment.paymentStatus = paymentStatus;
    if (paymentMethod) appointment.paymentMethod = paymentMethod;
    if (suggestedTimeFrame) appointment.suggestedTimeFrame = suggestedTimeFrame;

    await appointment.save();

    // Send notifications based on status change
    if (status && status !== previousStatus) {
        if (status === "Confirmed") {
            const title = "Appointment Confirmed! \u2728";
            const message = `Your appointment on ${new Date(appointment.appointmentDate).toDateString()} at ${appointment.appointmentTime} has been confirmed. Here is your Appointment Card!`;
            
            // Appointment Card Notification
            await notificationService.createNotification(appointment.customer._id, "Appointment", title, message);
            
            // Send Email
            if (appointment.customer.email) {
                const html = `<h2>${title}</h2><p>Hi ${appointment.customer.firstName},</p><p>${message}</p><p>Thank you for choosing Aai Beauty Studio!</p>`;
                await emailService.sendEmail(appointment.customer.email, title, html);
            }
        } else if (status === "Cancelled" || status === "Rejected") {
            const title = "Appointment Rejected \uD83D\uDE14";
            const rescheduleText = suggestedTimeFrame ? ` We suggest rescheduling to: ${suggestedTimeFrame}.` : " Please reschedule at your earliest convenience.";
            const message = `Sorry, your appointment on ${new Date(appointment.appointmentDate).toDateString()} at ${appointment.appointmentTime} was declined.${rescheduleText}`;
            
            // Sorry Card Notification
            await notificationService.createNotification(appointment.customer._id, "Appointment", title, message);
            
            // Send Email
            if (appointment.customer.email) {
                const html = `<h2>${title}</h2><p>Hi ${appointment.customer.firstName},</p><p>${message}</p>`;
                await emailService.sendEmail(appointment.customer.email, title, html);
            }
        }
    }

    // Loyalty Engine logic: Automatically award points when status changes to Completed for the first time
    if (status === "Completed" && !wasAlreadyCompleted) {
        const points = Math.floor(appointment.totalAmount / 100);

        if (points > 0) {
            // Create Loyalty Transaction
            await LoyaltyTransaction.create({
                user: appointment.customer,
                appointment: appointment._id,
                points,
                type: "Earned",
                reason: "Appointment Completed",
            });

            // Update user points and membership
            const user = await User.findById(appointment.customer);
            if (user) {
                user.glowPoints += points;
                user.lifetimeGlowPoints += points;
                user.monthlyGlowPoints = (user.monthlyGlowPoints || 0) + points;
                if (typeof user.updateMembership === "function") {
                    user.updateMembership();
                }
                await user.save();
            }
        }
    }

    return appointment;
};

const deleteAppointment = async (appointmentId) => {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
        throw new AppError("Appointment not found", 404);
    }

    // Soft delete logic (we'll implement it by setting status to Cancelled or just physical delete if required,
    // prompt says: "Soft delete only if required". Let's use physical delete for now or status change)
    // Actually, setting status to Cancelled is better.
    appointment.status = "Cancelled";
    await appointment.save();

    return appointment;
};

module.exports = {
    bookAppointment,
    getCustomerAppointments,
    getSingleAppointment,
    getAllAppointments,
    updateAppointmentStatus,
    deleteAppointment,
};
