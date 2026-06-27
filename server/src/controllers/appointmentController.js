const appointmentService = require("../services/appointmentService");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");

const bookAppointment = asyncHandler(async (req, res) => {
    const appointment = await appointmentService.bookAppointment(req.user._id, req.body);
    sendResponse(res, 201, true, "Appointment booked successfully", appointment);
});

const getCustomerAppointments = asyncHandler(async (req, res) => {
    const appointments = await appointmentService.getCustomerAppointments(req.user._id);
    sendResponse(res, 200, true, "Your appointments retrieved successfully", appointments);
});

const getSingleAppointment = asyncHandler(async (req, res) => {
    const appointment = await appointmentService.getSingleAppointment(req.params.id, req.user);
    sendResponse(res, 200, true, "Appointment retrieved successfully", appointment);
});

const getAllAppointments = asyncHandler(async (req, res) => {
    const appointments = await appointmentService.getAllAppointments();
    sendResponse(res, 200, true, "All appointments retrieved successfully", appointments);
});

const updateAppointmentStatus = asyncHandler(async (req, res) => {
    const appointment = await appointmentService.updateAppointmentStatus(req.params.id, req.body);
    sendResponse(res, 200, true, "Appointment status updated successfully", appointment);
});

const deleteAppointment = asyncHandler(async (req, res) => {
    const appointment = await appointmentService.deleteAppointment(req.params.id);
    sendResponse(res, 200, true, "Appointment cancelled/deleted successfully", appointment);
});

module.exports = {
    bookAppointment,
    getCustomerAppointments,
    getSingleAppointment,
    getAllAppointments,
    updateAppointmentStatus,
    deleteAppointment,
};
