const mongoose = require("mongoose");

const visitorEventSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["page_view", "scroll", "button_click", "register_click", "register_open", "register_complete", "exit"],
            required: true,
        },
        page: String,
        data: mongoose.Schema.Types.Mixed,
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
);

const visitorSchema = new mongoose.Schema(
    {
        visitorId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
            index: true,
        },
        registered: {
            type: Boolean,
            default: false,
        },
        firstVisit: {
            type: Date,
            default: Date.now,
        },
        lastVisit: {
            type: Date,
            default: Date.now,
        },
        visitCount: {
            type: Number,
            default: 1,
        },
        sessionCount: {
            type: Number,
            default: 1,
        },
        device: String,
        browser: String,
        os: String,
        language: String,
        screenResolution: String,
        country: String,
        city: String,
        trafficSource: String,
        referrer: String,
        utmParameters: mongoose.Schema.Types.Mixed,
        notificationPermission: String,
        pwaInstalled: {
            type: Boolean,
            default: false,
        },
        entryPage: String,
        exitPage: String,
        currentPage: String,
        visitedPages: [String],
        totalTimeSpent: {
            type: Number,
            default: 0,
        },
        averageScrollPercentage: {
            type: Number,
            default: 0,
        },
        buttonClicks: {
            type: Map,
            of: Number,
            default: {},
        },
        registerClicked: {
            type: Boolean,
            default: false,
        },
        registerOpened: {
            type: Boolean,
            default: false,
        },
        events: [visitorEventSchema],
        lastActivity: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

visitorSchema.index({ createdAt: -1 });
visitorSchema.index({ registered: 1 });
visitorSchema.index({ lastVisit: -1 });

const Visitor = mongoose.model("Visitor", visitorSchema);
module.exports = Visitor;
