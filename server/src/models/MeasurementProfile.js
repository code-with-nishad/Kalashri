const mongoose = require("mongoose");

const measurementProfileSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        bust: { type: Number },
        waist: { type: Number },
        hip: { type: Number },
        shoulder: { type: Number },
        sleeve: { type: Number },
        length: { type: Number },
        neck: { type: Number },
        armhole: { type: Number },
        customNotes: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("MeasurementProfile", measurementProfileSchema);
