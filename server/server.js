const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const connectDB = require("./src/config/db");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./src/routes/authRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");
const appointmentRoutes = require("./src/routes/appointmentRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const cmsRoutes = require("./src/routes/cmsRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
const activityRoutes = require("./src/routes/activityRoutes");
const uploadRoutes = require("./src/routes/uploadRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const fashionOrderRoutes = require("./src/routes/fashionOrderRoutes");
const measurementRoutes = require("./src/routes/measurementRoutes");

dotenv.config();

const app = express();

connectDB();

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs for auth routes
    message: "Too many requests from this IP, please try again after 15 minutes",
});

const normalizeOrigin = (origin) => origin && origin.replace(/\/$/, "");

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://salon-management-system-henna.vercel.app",
    "https://kalashri.vercel.app",
    process.env.CLIENT_URL,
    ...(process.env.CORS_ORIGINS || "").split(","),
]
    .map((origin) => normalizeOrigin(origin && origin.trim()))
    .filter(Boolean);

const isAllowedOrigin = (origin) => {
    const normalizedOrigin = normalizeOrigin(origin);

    return (
        allowedOrigins.includes(normalizedOrigin) ||
        /^https:\/\/salon-management-system-[a-z0-9-]+\.vercel\.app$/.test(normalizedOrigin)
    );
};

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps, Postman)
            if (!origin) return callback(null, true);
            if (isAllowedOrigin(origin)) {
                return callback(null, true);
            }

            return callback(new Error(`Not allowed by CORS: ${origin}`));
        },
        credentials: true,
    })
);

// Webhook needs raw body, must be mounted before express.json()
app.use("/api/payments", paymentRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cms", cmsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/fashion-orders", fashionOrderRoutes);
app.use("/api/measurements", measurementRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Kalashri Super App API Running 🚀",
    });
});

const PORT = process.env.PORT || 5000;
app.use(errorMiddleware);

const { startScheduler } = require("./src/scripts/reminderScheduler");
startScheduler();

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
