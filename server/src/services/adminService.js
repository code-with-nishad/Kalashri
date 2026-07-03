const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const FashionOrder = require("../models/FashionOrder");
const MeasurementProfile = require("../models/MeasurementProfile");
const AppError = require("../utils/AppError");
const {
    registerAdminSchema,
    updateNotesSchema,
} = require("../validations/adminValidation");

const registerAdmin = async (adminData) => {
    const validationResult = registerAdminSchema.safeParse(adminData);
    if (!validationResult.success) {
        const errors = validationResult.error.issues.map((err) => err.message).join(", ");
        throw new AppError(errors, 400);
    }

    const { adminSecret, firstName, lastName, email, phone, password } = validationResult.data;

    if (adminSecret !== process.env.ADMIN_SECRET) {
        throw new AppError("Unauthorized: Invalid Admin Secret", 401);
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
        throw new AppError("User with this email or phone already exists", 400);
    }

    return User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        role: "admin",
        isVerified: true,
    });
};

const getRevenueStats = async (today, startOfMonth, startOfYear) => {
    const appointmentRevenue = await Appointment.aggregate([
        { $match: { status: "Completed" } },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
                todayRevenue: {
                    $sum: { $cond: [{ $gte: ["$createdAt", today] }, "$totalAmount", 0] },
                },
                monthlyRevenue: {
                    $sum: { $cond: [{ $gte: ["$createdAt", startOfMonth] }, "$totalAmount", 0] },
                },
                yearlyRevenue: {
                    $sum: { $cond: [{ $gte: ["$createdAt", startOfYear] }, "$totalAmount", 0] },
                },
                todayAppointments: {
                    $sum: { $cond: [{ $gte: ["$createdAt", today] }, 1, 0] },
                },
            },
        },
    ]);

    const fashionRevenue = await FashionOrder.aggregate([
        { $match: { isDelivered: true } },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
                todayRevenue: {
                    $sum: { $cond: [{ $gte: ["$createdAt", today] }, "$totalAmount", 0] },
                },
                monthlyRevenue: {
                    $sum: { $cond: [{ $gte: ["$createdAt", startOfMonth] }, "$totalAmount", 0] },
                },
                yearlyRevenue: {
                    $sum: { $cond: [{ $gte: ["$createdAt", startOfYear] }, "$totalAmount", 0] },
                },
            },
        },
    ]);

    const appointments = appointmentRevenue[0] || {};
    const fashion = fashionRevenue[0] || {};

    return {
        totalRevenue: (appointments.totalRevenue || 0) + (fashion.totalRevenue || 0),
        todayRevenue: (appointments.todayRevenue || 0) + (fashion.todayRevenue || 0),
        monthlyRevenue: (appointments.monthlyRevenue || 0) + (fashion.monthlyRevenue || 0),
        yearlyRevenue: (appointments.yearlyRevenue || 0) + (fashion.yearlyRevenue || 0),
        todayAppointments: appointments.todayAppointments || 0,
    };
};

const getPopularServices = async (limit = 10) => {
    return Appointment.aggregate([
        { $match: { status: "Completed" } },
        { $unwind: "$services" },
        {
            $group: {
                _id: "$services.service",
                serviceName: { $first: "$services.serviceName" },
                timesBooked: { $sum: 1 },
                count: { $sum: 1 },
                revenueGenerated: { $sum: "$services.price" },
            },
        },
        { $sort: { timesBooked: -1 } },
        { $limit: limit },
    ]);
};

const getDashboardStats = async () => {
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalServices = await Service.countDocuments();
    const activeServices = await Service.countDocuments({ isActive: true });
    const totalFashionOrders = await FashionOrder.countDocuments();
    const pendingFashionOrders = await FashionOrder.countDocuments({ isDelivered: false });
    const totalMeasurements = await MeasurementProfile.countDocuments();

    const appointmentsAggregation = await Appointment.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 },
            },
        },
    ]);

    let pendingAppointments = 0;
    let confirmedAppointments = 0;
    let completedAppointments = 0;
    let cancelledAppointments = 0;
    let totalAppointments = 0;

    appointmentsAggregation.forEach((stat) => {
        totalAppointments += stat.count;
        if (stat._id === "Pending") pendingAppointments = stat.count;
        if (stat._id === "Confirmed") confirmedAppointments = stat.count;
        if (stat._id === "Completed") completedAppointments = stat.count;
        if (stat._id === "Cancelled") cancelledAppointments = stat.count;
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const revenueData = await getRevenueStats(today, startOfMonth, startOfYear);
    const averageAppointmentValue = completedAppointments > 0 ? revenueData.totalRevenue / completedAppointments : 0;

    const repeatCustomersAggregation = await Appointment.aggregate([
        { $match: { status: "Completed" } },
        { $group: { _id: "$customer", count: { $sum: 1 } } },
        { $match: { count: { $gt: 1 } } },
        { $count: "repeatCustomers" },
    ]);

    const popularServices = await getPopularServices(5);

    return {
        totalCustomers,
        totalAdmins,
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        completedAppointments,
        cancelledAppointments,
        totalServices,
        activeServices,
        totalFashionOrders,
        pendingFashionOrders,
        totalMeasurements,
        monthlyRevenue: revenueData.monthlyRevenue,
        yearlyRevenue: revenueData.yearlyRevenue,
        totalRevenue: revenueData.totalRevenue,
        todayAppointments: revenueData.todayAppointments,
        todayRevenue: revenueData.todayRevenue,
        averageAppointmentValue: Math.round(averageAppointmentValue),
        repeatCustomers: repeatCustomersAggregation[0]?.repeatCustomers || 0,
        popularServices,
    };
};

const getCustomers = async (query) => {
    const { search, sort, page = 1, limit = 10 } = query;
    const filter = { role: "customer" };

    if (search) {
        filter.$or = [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
        ];
    }

    let mongooseQuery = User.find(filter).select("-password");
    mongooseQuery = sort ? mongooseQuery.sort(sort.split(",").join(" ")) : mongooseQuery.sort("-createdAt");

    const skip = (Number(page) - 1) * Number(limit);
    const customers = await mongooseQuery.skip(skip).limit(Number(limit));
    const total = await User.countDocuments(filter);

    return {
        customers,
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
    };
};

const getCustomerDetails = async (id) => {
    const customer = await User.findOne({ _id: id, role: "customer" }).select("-password");
    if (!customer) throw new AppError("Customer not found", 404);

    const appointments = await Appointment.find({ customer: id }).sort("-createdAt").populate("services.service", "name");
    const fashionOrders = await FashionOrder.find({ customer: id }).sort("-createdAt");
    const measurements = await MeasurementProfile.find({ customer: id }).sort("-updatedAt");

    return {
        customer,
        appointments,
        fashionOrders,
        measurements,
    };
};

const updateCustomerNotes = async (id, notesData) => {
    const validationResult = updateNotesSchema.safeParse(notesData);
    if (!validationResult.success) {
        throw new AppError("Invalid notes data", 400);
    }

    const customer = await User.findOneAndUpdate(
        { _id: id, role: "customer" },
        { adminNotes: validationResult.data.adminNotes },
        { returnDocument: "after" }
    ).select("-password");

    if (!customer) throw new AppError("Customer not found", 404);
    return customer;
};

const getAnalytics = async () => {
    const topCustomers = await Appointment.aggregate([
        { $match: { status: "Completed" } },
        {
            $group: {
                _id: "$customer",
                totalRevenue: { $sum: "$totalAmount" },
                totalSpent: { $sum: "$totalAmount" },
                appointmentsCount: { $sum: 1 },
            },
        },
        { $sort: { totalRevenue: -1 } },
        { $limit: 10 },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "customerData",
            },
        },
        { $unwind: "$customerData" },
        {
            $project: {
                _id: 1,
                totalRevenue: 1,
                totalSpent: 1,
                appointmentsCount: 1,
                firstName: "$customerData.firstName",
                lastName: "$customerData.lastName",
                email: "$customerData.email",
                phone: "$customerData.phone",
            },
        },
    ]);

    const popularServices = await getPopularServices(10);

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);

    const newCustomersThisMonth = await User.countDocuments({
        role: "customer",
        createdAt: { $gte: startOfMonth },
    });

    const monthlyStats = await Appointment.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m", date: "$createdAt" },
                },
                totalAppointments: { $sum: 1 },
                totalRevenue: {
                    $sum: {
                        $cond: [{ $eq: ["$status", "Completed"] }, "$totalAmount", 0],
                    },
                },
            },
        },
        { $sort: { _id: 1 } },
    ]);

    return {
        topCustomers,
        popularServices,
        newCustomersThisMonth,
        monthlyStats,
    };
};

const getDashboardWidgets = async () => {
    const newestCustomers = await User.find({ role: "customer" }).sort("-createdAt").limit(5).select("firstName lastName email createdAt avatar");
    const latestAppointments = await Appointment.find().sort("-createdAt").limit(5).populate("customer", "firstName lastName");
    const latestFashionOrders = await FashionOrder.find().sort("-createdAt").limit(5).populate("customer", "firstName lastName");
    const popularServices = await getPopularServices(5);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const revenueData = await getRevenueStats(today, startOfMonth, new Date(today.getFullYear(), 0, 1));

    const currentMonth = today.getMonth() + 1;
    const upcomingBirthdays = await User.aggregate([
        { $match: { role: "customer", dob: { $exists: true, $ne: null } } },
        {
            $project: {
                firstName: 1,
                lastName: 1,
                dob: 1,
                month: { $month: "$dob" },
            },
        },
        { $match: { month: currentMonth } },
        { $limit: 5 },
    ]);

    return {
        newestCustomers,
        latestAppointments,
        latestFashionOrders,
        popularServices,
        todayRevenue: revenueData.todayRevenue,
        monthlyRevenue: revenueData.monthlyRevenue,
        upcomingBirthdays,
    };
};

module.exports = {
    registerAdmin,
    getDashboardStats,
    getCustomers,
    getCustomerDetails,
    updateCustomerNotes,
    getAnalytics,
    getDashboardWidgets,
};
