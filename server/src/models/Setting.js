const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
    {
        general: {
            salonName: { type: String, default: "Gayatri Beauty Studio" },
            logo: { type: String, default: "" },
            about: { type: String, default: "" },
            mission: { type: String, default: "" },
            vision: { type: String, default: "" },
        },
        hero: {
            title: { type: String, default: "Welcome to Gayatri Beauty Studio" },
            subtitle: { type: String, default: "Your beauty, our passion." },
            image: { type: String, default: "" },
            video: { type: String, default: "" },
            primaryButtonText: { type: String, default: "Book Now" },
            primaryButtonLink: { type: String, default: "/book" },
            secondaryButtonText: { type: String, default: "Services" },
            secondaryButtonLink: { type: String, default: "/services" },
            bgImage: { type: String, default: "" },
        },
        contact: {
            phone: { type: String, default: "" },
            email: { type: String, default: "" },
            whatsapp: { type: String, default: "" },
            emergencyNumber: { type: String, default: "" },
            address: { type: String, default: "" },
            mapLink: { type: String, default: "" },
            instagram: { type: String, default: "" },
            facebook: { type: String, default: "" },
            youtube: { type: String, default: "" },
        },
        businessHours: {
            monday: { isOpen: { type: Boolean, default: true }, openTime: { type: String, default: "09:00 AM" }, closeTime: { type: String, default: "08:00 PM" } },
            tuesday: { isOpen: { type: Boolean, default: true }, openTime: { type: String, default: "09:00 AM" }, closeTime: { type: String, default: "08:00 PM" } },
            wednesday: { isOpen: { type: Boolean, default: true }, openTime: { type: String, default: "09:00 AM" }, closeTime: { type: String, default: "08:00 PM" } },
            thursday: { isOpen: { type: Boolean, default: true }, openTime: { type: String, default: "09:00 AM" }, closeTime: { type: String, default: "08:00 PM" } },
            friday: { isOpen: { type: Boolean, default: true }, openTime: { type: String, default: "09:00 AM" }, closeTime: { type: String, default: "08:00 PM" } },
            saturday: { isOpen: { type: Boolean, default: true }, openTime: { type: String, default: "09:00 AM" }, closeTime: { type: String, default: "08:00 PM" } },
            sunday: { isOpen: { type: Boolean, default: false }, openTime: { type: String, default: "10:00 AM" }, closeTime: { type: String, default: "05:00 PM" } },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Setting", settingSchema);
