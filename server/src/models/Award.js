const mongoose = require("mongoose");

const awardSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        image: {
            type: String,
            required: [true, "Image is required"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Award", awardSchema);
