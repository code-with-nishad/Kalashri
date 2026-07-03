const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "first Name is required"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "last Name is required"],
            trim: true,
        },

        googleId: {
            type: String,
            sparse: true,
            unique: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },

        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer",
        },

        avatar: {
            type: String,
            default: "",
        },

        dob: {
            type: Date,
        },

        instagram: {
            type: String,
            default: "",
        },

        adminNotes: {
            type: String,
            default: "",
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        pushSubscriptions: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            id: this._id,
            role: this.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE,
        }
    );
};

module.exports = mongoose.model("User", userSchema);
