const express = require("express");
const { 
    createMeasurement, 
    getMeasurements, 
    getMeasurement, 
    getMeasurementByCustomer, 
    updateMeasurement, 
    deleteMeasurement 
} = require("../controllers/measurementController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
    .post(protect, authorize("admin"), createMeasurement)
    .get(protect, authorize("admin"), getMeasurements);

router.route("/customer/:customerId")
    .get(protect, getMeasurementByCustomer);

router.route("/:id")
    .get(protect, getMeasurement)
    .put(protect, authorize("admin"), updateMeasurement)
    .delete(protect, authorize("admin"), deleteMeasurement);

module.exports = router;
