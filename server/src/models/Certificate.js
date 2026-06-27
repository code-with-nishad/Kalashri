const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        organization: {
            type: String,
            required: [true, "Organization is required"],
            trim: true,
        },
        issueDate: {
            type: Date,
            required: [true, "Issue Date is required"],
        },
        certificateImage: {
            type: String,
            required: [true, "Certificate Image is required"],
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        featured: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Certificate", certificateSchema);
