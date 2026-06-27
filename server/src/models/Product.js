const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        slug: {
            type: String,
            trim: true,
            unique: true,
            sparse: true,
        },
        sku: {
            type: String,
            required: [true, "SKU is required"],
            unique: true,
            trim: true,
        },
        brand: {
            type: String,
            trim: true,
            default: "",
        },
        category: {
            type: String,
            required: [true, "Category is required"],
        },
<<<<<<< HEAD
        subcategory: { type: String, trim: true },
        brand: { type: String, trim: true },
        description: { type: String, trim: true },
        features: { type: String, trim: true },
        benefits: { type: String, trim: true },
        ingredients: { type: String, trim: true },
        usage: { type: String, trim: true },
        image: { type: String, trim: true },
        gallery: [{ type: String, trim: true }],
        price: {
            type: Number,
            required: [true, "Price is required"],
            default: 0,
        },
        originalPrice: { type: Number },
        discount: { type: Number, default: 0 },
        rating: { type: Number, default: 0 },
        reviewCount: { type: Number, default: 0 },
=======
        description: {
            type: String,
            trim: true,
            default: "",
        },
        size: {
            type: String,
            trim: true,
            default: "",
        },
        keyIngredients: {
            type: [String],
            default: [],
        },
        benefits: {
            type: [String],
            default: [],
        },
        imageUrl: {
            type: String,
            trim: true,
            default: "",
        },
>>>>>>> f55ae792d48231ef8f03e454cd36041d2c1eb580
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
        isFeatured: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
        tags: [{ type: String, trim: true }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
