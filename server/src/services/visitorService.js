const Visitor = require("../models/Visitor");
const AppError = require("../utils/AppError");

const trackVisitor = async (visitorData) => {
    const { visitorId, page, device, browser, os, language, screenResolution, country, city, trafficSource, referrer, utmParameters, notificationPermission, pwaInstalled } = visitorData;

    let visitor = await Visitor.findOne({ visitorId });

    if (visitor) {
        // Update existing visitor
        visitor.lastVisit = new Date();
        visitor.lastActivity = new Date();
        visitor.visitCount += 1;
        visitor.currentPage = page;
        
        // Add page to visited pages if not already there
        if (!visitor.visitedPages.includes(page)) {
            visitor.visitedPages.push(page);
        }

        // Update device info if provided
        if (device) visitor.device = device;
        if (browser) visitor.browser = browser;
        if (os) visitor.os = os;
        if (language) visitor.language = language;
        if (screenResolution) visitor.screenResolution = screenResolution;
        if (country) visitor.country = country;
        if (city) visitor.city = city;
        if (trafficSource) visitor.trafficSource = trafficSource;
        if (referrer) visitor.referrer = referrer;
        if (utmParameters) visitor.utmParameters = utmParameters;
        if (notificationPermission) visitor.notificationPermission = notificationPermission;
        if (pwaInstalled !== undefined) visitor.pwaInstalled = pwaInstalled;

        // Add page view event
        visitor.events.push({
            type: "page_view",
            page,
            timestamp: new Date(),
        });

        // Keep only last 100 events to prevent bloat
        if (visitor.events.length > 100) {
            visitor.events = visitor.events.slice(-100);
        }

        await visitor.save();
    } else {
        // Create new visitor
        visitor = await Visitor.create({
            visitorId,
            entryPage: page,
            currentPage: page,
            visitedPages: [page],
            device,
            browser,
            os,
            language,
            screenResolution,
            country,
            city,
            trafficSource,
            referrer,
            utmParameters,
            notificationPermission,
            pwaInstalled,
            events: [{
                type: "page_view",
                page,
                timestamp: new Date(),
            }],
        });
    }

    return visitor;
};

const trackEvent = async (visitorId, eventType, eventData) => {
    const visitor = await Visitor.findOne({ visitorId });
    if (!visitor) return null;

    visitor.lastActivity = new Date();

    // Handle specific event types
    if (eventType === "scroll") {
        const scrollPercentage = eventData?.scrollPercentage || 0;
        visitor.averageScrollPercentage = (visitor.averageScrollPercentage * (visitor.events.filter(e => e.type === "scroll").length) + scrollPercentage) / (visitor.events.filter(e => e.type === "scroll").length + 1);
    } else if (eventType === "button_click") {
        const buttonName = eventData?.buttonName || "unknown";
        const currentCount = visitor.buttonClicks.get(buttonName) || 0;
        visitor.buttonClicks.set(buttonName, currentCount + 1);
    } else if (eventType === "register_click") {
        visitor.registerClicked = true;
    } else if (eventType === "register_open") {
        visitor.registerOpened = true;
    } else if (eventType === "exit") {
        visitor.exitPage = eventData?.page || visitor.currentPage;
    }

    // Add event to timeline
    visitor.events.push({
        type: eventType,
        page: eventData?.page || visitor.currentPage,
        data: eventData,
        timestamp: new Date(),
    });

    // Keep only last 100 events
    if (visitor.events.length > 100) {
        visitor.events = visitor.events.slice(-100);
    }

    await visitor.save();
    return visitor;
};

const updateTimeSpent = async (visitorId, timeSpent) => {
    const visitor = await Visitor.findOne({ visitorId });
    if (!visitor) return null;

    visitor.totalTimeSpent += timeSpent;
    visitor.lastActivity = new Date();
    await visitor.save();
    return visitor;
};

const linkVisitorToUser = async (visitorId, userId) => {
    const visitor = await Visitor.findOne({ visitorId });
    if (!visitor) return null;

    visitor.userId = userId;
    visitor.registered = true;
    
    // Add registration complete event
    visitor.events.push({
        type: "register_complete",
        timestamp: new Date(),
    });

    await visitor.save();
    return visitor;
};

const getVisitorAnalytics = async (filters = {}) => {
    const { startDate, endDate, registered } = {};

    const matchQuery = {};
    if (startDate || endDate) {
        matchQuery.createdAt = {};
        if (startDate) matchQuery.createdAt.$gte = new Date(startDate);
        if (endDate) matchQuery.createdAt.$lte = new Date(endDate);
    }
    if (registered !== undefined) {
        matchQuery.registered = registered;
    }

    const totalVisitors = await Visitor.countDocuments(matchQuery);
    const registeredVisitors = await Visitor.countDocuments({ ...matchQuery, registered: true });
    const anonymousVisitors = totalVisitors - registeredVisitors;

    // Today's visitors
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayVisitors = await Visitor.countDocuments({ createdAt: { $gte: today } });

    // Yesterday's visitors
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayVisitors = await Visitor.countDocuments({
        createdAt: { $gte: yesterday, $lt: today }
    });

    // This week's visitors
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekVisitors = await Visitor.countDocuments({ createdAt: { $gte: weekAgo } });

    // This month's visitors
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const monthVisitors = await Visitor.countDocuments({ createdAt: { $gte: monthAgo } });

    // Active visitors (last 30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const activeVisitors = await Visitor.countDocuments({ lastActivity: { $gte: thirtyMinutesAgo } });

    // Returning visitors (visitCount > 1)
    const returningVisitors = await Visitor.countDocuments({ visitCount: { $gt: 1 } });

    // Conversion rate
    const conversionRate = totalVisitors > 0 ? (registeredVisitors / totalVisitors) * 100 : 0;

    // Average session time
    const avgTimeSpentAgg = await Visitor.aggregate([
        { $match: matchQuery },
        {
            $group: {
                _id: null,
                avgTimeSpent: { $avg: "$totalTimeSpent" },
            },
        },
    ]);
    const avgSessionTime = avgTimeSpentAgg[0]?.avgTimeSpent || 0;

    // Average scroll percentage
    const avgScrollAgg = await Visitor.aggregate([
        { $match: matchQuery },
        {
            $group: {
                _id: null,
                avgScroll: { $avg: "$averageScrollPercentage" },
            },
        },
    ]);
    const avgScrollPercentage = avgScrollAgg[0]?.avgScroll || 0;

    // Most viewed pages
    const popularPagesAgg = await Visitor.aggregate([
        { $match: matchQuery },
        { $unwind: "$visitedPages" },
        {
            $group: {
                _id: "$visitedPages",
                count: { $sum: 1 },
            },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
    ]);

    // Most clicked buttons
    const buttonClicksAgg = await Visitor.aggregate([
        { $match: matchQuery },
        { $project: { buttonClicks: 1 } },
        { $unwind: "$buttonClicks" },
        {
            $group: {
                _id: { key: "$buttonClicks.k", value: "$buttonClicks.v" },
                totalClicks: { $sum: "$buttonClicks.v" },
            },
        },
        { $sort: { totalClicks: -1 } },
        { $limit: 10 },
    ]);

    // Notification permission percentage
    const notificationGranted = await Visitor.countDocuments({
        ...matchQuery,
        notificationPermission: "granted",
    });
    const notificationPermissionPercent = totalVisitors > 0 ? (notificationGranted / totalVisitors) * 100 : 0;

    // PWA install percentage
    const pwaInstalled = await Visitor.countDocuments({
        ...matchQuery,
        pwaInstalled: true,
    });
    const pwaInstallPercent = totalVisitors > 0 ? (pwaInstalled / totalVisitors) * 100 : 0;

    // Traffic sources
    const trafficSourcesAgg = await Visitor.aggregate([
        { $match: { ...matchQuery, trafficSource: { $ne: null, $ne: "" } } },
        {
            $group: {
                _id: "$trafficSource",
                count: { $sum: 1 },
            },
        },
        { $sort: { count: -1 } },
    ]);

    // Device types
    const devicesAgg = await Visitor.aggregate([
        { $match: { ...matchQuery, device: { $ne: null, $ne: "" } } },
        {
            $group: {
                _id: "$device",
                count: { $sum: 1 },
            },
        },
        { $sort: { count: -1 } },
    ]);

    // Browsers
    const browsersAgg = await Visitor.aggregate([
        { $match: { ...matchQuery, browser: { $ne: null, $ne: "" } } },
        {
            $group: {
                _id: "$browser",
                count: { $sum: 1 },
            },
        },
        { $sort: { count: -1 } },
    ]);

    // Countries
    const countriesAgg = await Visitor.aggregate([
        { $match: { ...matchQuery, country: { $ne: null, $ne: "" } } },
        {
            $group: {
                _id: "$country",
                count: { $sum: 1 },
            },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
    ]);

    // Visitors per day (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const visitorsPerDay = await Visitor.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                count: { $sum: 1 },
                registered: {
                    $sum: { $cond: ["$registered", 1, 0] },
                },
            },
        },
        { $sort: { _id: 1 } },
    ]);

    return {
        totalVisitors,
        registeredVisitors,
        anonymousVisitors,
        todayVisitors,
        yesterdayVisitors,
        weekVisitors,
        monthVisitors,
        activeVisitors,
        returningVisitors,
        conversionRate,
        avgSessionTime,
        avgScrollPercentage,
        popularPages: popularPagesAgg,
        buttonClicks: buttonClicksAgg,
        notificationPermissionPercent,
        pwaInstallPercent,
        trafficSources: trafficSourcesAgg,
        devices: devicesAgg,
        browsers: browsersAgg,
        countries: countriesAgg,
        visitorsPerDay,
    };
};

const getVisitorsList = async (query = {}) => {
    const { search, registered, sort, page = 1, limit = 20 } = query;

    const filter = {};
    if (registered !== undefined) {
        filter.registered = registered === "true";
    }
    if (search) {
        filter.$or = [
            { visitorId: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } },
            { city: { $regex: search, $options: "i" } },
        ];
    }

    let mongooseQuery = Visitor.find(filter);

    if (sort) {
        mongooseQuery = mongooseQuery.sort(sort.split(",").join(" "));
    } else {
        mongooseQuery = mongooseQuery.sort("-lastVisit");
    }

    const skip = (page - 1) * limit;
    mongooseQuery = mongooseQuery.skip(skip).limit(Number(limit));

    const visitors = await mongooseQuery;
    const total = await Visitor.countDocuments(filter);

    return {
        visitors,
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
    };
};

const getVisitorDetails = async (visitorId) => {
    const visitor = await Visitor.findOne({ visitorId });
    if (!visitor) throw new AppError("Visitor not found", 404);

    return visitor;
};

const getRegistrationFunnel = async () => {
    const totalVisitors = await Visitor.countDocuments();
    const viewedServices = await Visitor.countDocuments({ visitedPages: /services/i });
    const viewedRewards = await Visitor.countDocuments({ visitedPages: /rewards/i });
    const registerClicked = await Visitor.countDocuments({ registerClicked: true });
    const registerOpened = await Visitor.countDocuments({ registerOpened: true });
    const registered = await Visitor.countDocuments({ registered: true });

    return {
        websiteVisit: totalVisitors,
        viewedServices,
        viewedRewards,
        registerClicked,
        registerOpened,
        registered,
    };
};

module.exports = {
    trackVisitor,
    trackEvent,
    updateTimeSpent,
    linkVisitorToUser,
    getVisitorAnalytics,
    getVisitorsList,
    getVisitorDetails,
    getRegistrationFunnel,
};
