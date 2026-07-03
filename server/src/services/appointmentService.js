const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const notificationService = require("./notificationService");
const emailService = require("../utils/emailService");
const { createAppointmentSchema, updateAppointmentStatusSchema } = require("../validations/appointmentValidation");

const bookAppointment = async (userId, appointmentData) => {
    // Validate request data
    const validationResult = createAppointmentSchema.safeParse(appointmentData);
    if (!validationResult.success) {
        const errors = validationResult.error.issues.map((err) => err.message).join(", ");
        throw new AppError(errors, 400);
    }

    const { serviceIds, customServices, appointmentDate, appointmentTime, notes, paymentMethod, transactionId, paymentScreenshot } = validationResult.data;

    // Check for Double Booking
    const existingAppointment = await Appointment.findOne({
        appointmentDate,
        appointmentTime,
        status: { $nin: ["Cancelled", "Rejected", "Payment Failed"] }
    });

    if (existingAppointment) {
        throw new AppError(`The time slot ${appointmentTime} is already booked. Please choose another time.`, 400);
    }

    const servicesSnapshot = [];
    let totalAmount = 0;
    let totalDuration = 0;

    if (serviceIds.length > 0) {
        const services = await Service.find({ _id: { $in: serviceIds }, isActive: true });

        if (services.length !== serviceIds.length) {
            throw new AppError("One or more services are invalid or unavailable", 400);
        }

        services.forEach((service) => {
            totalDuration += service.duration;
            totalAmount += service.price || 0;

            servicesSnapshot.push({
                service: service._id,
                serviceName: service.name,
                price: service.price || 0,
                duration: service.duration,
                isCustom: false,
            });
        });
    }

    customServices.forEach((request) => {
        servicesSnapshot.push({
            serviceName: request,
            price: 0,
            duration: 30,
            isCustom: true,
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
        paymentMethod,
        transactionId,
        paymentScreenshot,
        paymentStatus: paymentMethod === "Manual UPI" ? "Verification Pending" : paymentMethod === "Cash" ? "Unpaid" : "Pending",
        status: "Pending",
    });

    // Notify Customer
    notificationService.sendToUser(
        userId,
        "Appointment",
        "Booking Requested 📅",
        `Your appointment request for ${appointmentDate} at ${appointmentTime} has been received and is pending confirmation.`,
        { route: "/appointments" }
    ).catch(console.error);

    // Notify Admins
    const admins = await User.find({ role: "admin" });
    for (const admin of admins) {
        notificationService.sendToUser(
            admin._id,
            "Appointment",
            "New Booking Request 🛎️",
            `A new appointment has been requested for ${appointmentDate} at ${appointmentTime}.`,
            { route: "/admin/appointments" }
        ).catch(console.error);
    }

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
        const errors = validationResult.error.issues.map((err) => err.message).join(", ");
        throw new AppError(errors, 400);
    }

    const { status, paymentStatus, paymentMethod, suggestedTimeFrame, transactionId, paymentScreenshot, totalAmount, services } = validationResult.data;

    const appointment = await Appointment.findById(appointmentId).populate("customer", "firstName lastName email phone");

    if (!appointment) {
        throw new AppError("Appointment not found", 404);
    }

    const previousStatus = appointment.status;
    const previousPaymentStatus = appointment.paymentStatus;

    // Update fields
    if (status) appointment.status = status;
    if (paymentStatus) {
        appointment.paymentStatus = paymentStatus;
        if (paymentStatus === "Paid" && previousPaymentStatus === "Verification Pending") {
            appointment.verifiedAt = new Date();
            // TODO: Extract admin user from context if passed, for verifiedBy.
        }
    }
    if (paymentMethod) appointment.paymentMethod = paymentMethod;
    if (suggestedTimeFrame) appointment.suggestedTimeFrame = suggestedTimeFrame;
    if (transactionId) appointment.transactionId = transactionId;
    if (paymentScreenshot) appointment.paymentScreenshot = paymentScreenshot;

    if (services && services.length > 0) {
        services.forEach((updated, index) => {
            if (appointment.services[index]) {
                appointment.services[index].price = updated.price;
                if (updated.duration !== undefined) {
                    appointment.services[index].duration = updated.duration;
                }
            }
        });
        appointment.markModified("services");
        appointment.totalAmount = totalAmount ?? services.reduce((sum, s) => sum + s.price, 0);
    } else if (totalAmount !== undefined) {
        appointment.totalAmount = totalAmount;
    }

    if (status === "Completed" && appointment.totalAmount <= 0) {
        throw new AppError("Please set service prices before marking as completed", 400);
    }
    
    // Auto-confirm if paid via manual verification
    if (paymentStatus === "Paid" && appointment.paymentMethod === "Manual UPI" && status !== "Completed") {
        appointment.status = "Confirmed";
    }

    // Auto-reject if payment rejected
    if (paymentStatus === "Rejected") {
        appointment.status = "Payment Failed";
    }

    // When completed, mark completedAt and payment as paid
    if (status === "Completed") {
        appointment.completedAt = new Date();
        appointment.paymentStatus = "Paid";
    }

    await appointment.save();

    // Send notifications based on status change
    if (status && status !== previousStatus) {
        if (status === "Confirmed") {
            const title = "Appointment Confirmed! ✨";
            const message = `Hello Queen, your pampering session is confirmed! Your appointment for ${appointment.services.map(s => s.serviceName).join(", ")} on ${new Date(appointment.appointmentDate).toDateString()} at ${appointment.appointmentTime} is confirmed. Enjoy your self-care time, gorgeous! ✨ Here is your Appointment Card!`;
            
            // Appointment Card Notification
            notificationService.sendToUser(appointment.customer._id, "Appointment", title, message, { route: `/appointments/${appointment._id}` }).catch(console.error);
            
            // Send Email
            if (appointment.customer.email) {
                const html = `<h2>${title}</h2><p>Hi ${appointment.customer.firstName},</p><p>${message}</p><p>Thank you for choosing Gayatri Beauty Studio!</p>`;
                emailService.sendEmail(appointment.customer.email, title, html).catch(console.error);
            }
        } else if (status === "Cancelled" || status === "Rejected" || status === "Payment Failed") {
            const title = "Appointment Rejected 😞";
            let reasonText = "";
            if (appointment.paymentStatus === "Rejected") {
                reasonText = " We could not verify your UPI payment. Please ensure you entered the correct UTR number or try booking again.";
            }
            const rescheduleText = suggestedTimeFrame ? ` We suggest rescheduling to: ${suggestedTimeFrame}.` : " Please reschedule at your earliest convenience.";
            const message = `Sorry, your appointment on ${new Date(appointment.appointmentDate).toDateString()} at ${appointment.appointmentTime} was declined.${reasonText}${rescheduleText}`;
            
            // Sorry Card Notification
            notificationService.sendToUser(appointment.customer._id, "Appointment", title, message, { route: `/appointments/${appointment._id}` }).catch(console.error);
            
            // Send Email
            if (appointment.customer.email) {
                const html = `<h2>${title}</h2><p>Hi ${appointment.customer.firstName},</p><p>${message}</p>`;
                emailService.sendEmail(appointment.customer.email, title, html).catch(console.error);
            }
        }
    } else if (appointment.status === "Confirmed" && paymentStatus === "Paid" && previousPaymentStatus === "Verification Pending") {
        // Just send payment verified notification if status was already confirmed somehow
        notificationService.sendToUser(appointment.customer._id, "Payment Verified", "Payment Verified ✅", "Your manual UPI payment has been successfully verified. Your appointment is confirmed.", { route: `/appointments/${appointment._id}` }).catch(console.error);
    }

    return appointment;
};

const deleteAppointment = async (appointmentId) => {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
        throw new AppError("Appointment not found", 404);
    }

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
