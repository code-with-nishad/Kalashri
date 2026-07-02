const MeasurementProfile = require("../models/MeasurementProfile");

exports.createMeasurement = async (req, res) => {
    try {
        const { customer } = req.body;
        // Check if measurement profile already exists for customer
        let profile = await MeasurementProfile.findOne({ customer });
        if (profile) {
            return res.status(400).json({ success: false, message: "Measurement profile already exists for this customer" });
        }
        profile = await MeasurementProfile.create(req.body);
        res.status(201).json({ success: true, data: profile });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getMeasurements = async (req, res) => {
    try {
        const profiles = await MeasurementProfile.find().populate("customer", "firstName lastName phone email");
        res.status(200).json({ success: true, count: profiles.length, data: profiles });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getMeasurement = async (req, res) => {
    try {
        const profile = await MeasurementProfile.findById(req.params.id).populate("customer");
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }
        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getMeasurementByCustomer = async (req, res) => {
    try {
        const profile = await MeasurementProfile.findOne({ customer: req.params.customerId }).populate("customer");
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }
        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


exports.updateMeasurement = async (req, res) => {
    try {
        const profile = await MeasurementProfile.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }
        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteMeasurement = async (req, res) => {
    try {
        const profile = await MeasurementProfile.findByIdAndDelete(req.params.id);
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
