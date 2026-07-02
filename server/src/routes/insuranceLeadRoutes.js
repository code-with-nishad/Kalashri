const express = require("express");
const { createLead, getLeads, getLead, updateLead, deleteLead } = require("../controllers/insuranceLeadController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
    .post(createLead) // Anyone can create a lead (like a form submission)
    .get(protect, authorize("admin"), getLeads);

router.route("/:id")
    .get(protect, authorize("admin"), getLead)
    .put(protect, authorize("admin"), updateLead)
    .delete(protect, authorize("admin"), deleteLead);

module.exports = router;
