const cron = require("node-cron");
const Appointment = require("../models/Appointment");
const notificationService = require("../services/notificationService");

// Start the scheduler
const startScheduler = () => {
    // Run every minute
    cron.schedule("* * * * *", async () => {
        try {
            const now = new Date();
            const future24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            const future2h = new Date(now.getTime() + 2 * 60 * 60 * 1000);
            const future30m = new Date(now.getTime() + 30 * 60 * 1000);
            
            // Format dates and times exactly as they are stored in DB (YYYY-MM-DD, HH:mm)
            // Note: In real app, timezones must be considered. Assuming local timezone for now.

            const checkReminders = async (targetDate, reminderType) => {
                const dateStr = targetDate.toISOString().split("T")[0];
                const hours = targetDate.getHours().toString().padStart(2, "0");
                const mins = targetDate.getMinutes().toString().padStart(2, "0");
                const timeStr = `${hours}:${mins}`;

                const appointments = await Appointment.find({
                    appointmentDate: dateStr,
                    appointmentTime: timeStr,
                    status: "Confirmed",
                    // Avoid sending the same reminder twice by tracking it (optional enhancement)
                }).populate("customer");

                for (const appt of appointments) {
                    let title = "Reminder ⏰";
                    let body = "";

                    if (reminderType === "24h") {
                        body = `Your appointment is tomorrow at ${appt.appointmentTime}.`;
                    } else if (reminderType === "2h") {
                        body = `Your appointment is in 2 hours at ${appt.appointmentTime}. See you soon!`;
                    } else if (reminderType === "30m") {
                        body = `We're waiting for you ❤️ Your appointment starts in 30 minutes!`;
                    }

                    if (body) {
                        await notificationService.sendToUser(
                            appt.customer._id,
                            "System",
                            title,
                            body,
                            { route: `/appointments/${appt._id}` }
                        );
                    }
                }
            };

            await checkReminders(future24h, "24h");
            await checkReminders(future2h, "2h");
            await checkReminders(future30m, "30m");
            
            // Appointment starting now
            await checkReminders(now, "now"); // Can customize body if needed

        } catch (error) {
            console.error("Error in reminder scheduler:", error);
        }
    });
    
    console.log("⏰ Reminder scheduler started");

    // Unread Notifications Reminder (Runs every 24 hours)
    cron.schedule("0 0 * * *", async () => {
        try {
            const Notification = require("../models/Notification");
            const User = require("../models/User");

            // Find notifications that are unread and created within the last 24 hours
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
            
            const unreadNotifications = await Notification.find({
                isRead: false,
                createdAt: { $gte: yesterday }
            });

            if (unreadNotifications.length === 0) return;

            // Group by user
            const userUnreadMap = {};
            unreadNotifications.forEach(n => {
                const uid = n.user.toString();
                if (!userUnreadMap[uid]) userUnreadMap[uid] = 0;
                userUnreadMap[uid]++;
            });

            // Send a single push to each user
            for (const [userId, count] of Object.entries(userUnreadMap)) {
                await notificationService.sendToUser(
                    userId,
                    "System",
                    "Unread Alerts 🔔",
                    `You have ${count} unread notification${count > 1 ? 's' : ''} waiting for you. Tap to view!`,
                    { route: "/notifications" }
                );
            }
        } catch (error) {
            console.error("Error in unread reminder scheduler:", error);
        }
    });
};

module.exports = { startScheduler };
