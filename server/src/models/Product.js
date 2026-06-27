const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        sku: {
            type: String,
            required: [true, "SKU is required"],
            unique: true,
            trim: true,
        },
        category: {
            type: String,
            required: [true, "Category is required"],
        },
        stockQuantity: {
            type: Number,
            default: 0,
            min: [0, "Stock cannot be negative"],
        },
        unit: {
            type: String,
            required: [true, "Unit is required (e.g., ml, bottles, tubes)"],
        },
        lowStockThreshold: {
            type: Number,
            default: 5,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
