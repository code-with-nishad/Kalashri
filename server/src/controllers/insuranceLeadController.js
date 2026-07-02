const InsuranceLead = require("../models/InsuranceLead");

exports.createLead = async (req, res) => {
    try {
        const lead = await InsuranceLead.create(req.body);
        res.status(201).json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getLeads = async (req, res) => {
    try {
        const leads = await InsuranceLead.find().populate("assignedStaff", "firstName lastName");
        res.status(200).json({ success: true, count: leads.length, data: leads });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getLead = async (req, res) => {
    try {
        const lead = await InsuranceLead.findById(req.params.id).populate("assignedStaff", "firstName lastName");
        if (!lead) {
            return res.status(404).json({ success: false, message: "Lead not found" });
        }
        res.status(200).json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateLead = async (req, res) => {
    try {
        const lead = await InsuranceLead.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!lead) {
            return res.status(404).json({ success: false, message: "Lead not found" });
        }
        res.status(200).json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteLead = async (req, res) => {
    try {
        const lead = await InsuranceLead.findByIdAndDelete(req.params.id);
        if (!lead) {
            return res.status(404).json({ success: false, message: "Lead not found" });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
