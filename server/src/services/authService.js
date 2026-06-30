const User = require("../models/User");
const Visitor = require("../models/Visitor");
const AppError = require("../utils/AppError");
const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const registerUser = async (userData) => {
    const { firstName, lastName, email, phone, password, visitorId } = userData;

    const existingUser = await User.findOne({
        $or: [{ email }, { phone }],
    });

    if (existingUser) {
        throw new AppError(
            "Email or Phone already registered",
            400
        );
    }

    const userCount = await User.countDocuments();
    const isEarlyBird = userCount < 50;

    const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        glowPoints: isEarlyBird ? 10 : 0,
        lifetimeGlowPoints: isEarlyBird ? 10 : 0,
    });

    // Link visitor to user if visitorId provided
    if (visitorId) {
        const visitor = await Visitor.findOne({ visitorId });
        if (visitor && !visitor.userId) {
            visitor.userId = user._id;
            visitor.registered = true;
            visitor.events.push({
                type: "register_complete",
                timestamp: new Date(),
            });
            await visitor.save();
        }
    }

    return user;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new AppError("Invalid Credentials", 401);
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new AppError("Invalid Credentials", 401);
    }

    return user;
};

const getCurrentUser = async (id) => {
    return await User.findById(id);
};

const updateCurrentUser = async (id, data) => {
    // Only allow updating specific fields
    const { firstName, lastName, phone, instagram, avatar } = data;
    
    // Check if phone is already taken by another user
    if (phone) {
        const existingPhone = await User.findOne({ phone, _id: { $ne: id } });
        if (existingPhone) {
            throw new AppError("Phone number already in use", 400);
        }
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        { firstName, lastName, phone, instagram, avatar },
        { returnDocument: 'after', runValidators: true }
    );
    return updatedUser;
};

const googleLogin = async (token, visitorId) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { email, given_name, family_name, sub } = payload;

    let user = await User.findOne({ email }).select("+password");
    const isNewUser = !user;

    if (!user) {
        const userCount = await User.countDocuments();
        const isEarlyBird = userCount < 50;

        user = await User.create({
            firstName: given_name || "User",
            lastName: family_name || "Name",
            email: email,
            phone: `google_${Date.now()}_${sub.slice(-4)}`,
            password: crypto.randomBytes(16).toString("hex"),
            googleId: sub,
            isVerified: true,
            glowPoints: isEarlyBird ? 10 : 0,
            lifetimeGlowPoints: isEarlyBird ? 10 : 0,
        });
    } else {
        if (!user.googleId) {
            user.googleId = sub;
            user.isVerified = true;
            await user.save();
        }
    }

    // Link visitor to user if visitorId provided and it's a new user
    if (visitorId && isNewUser) {
        const visitor = await Visitor.findOne({ visitorId });
        if (visitor && !visitor.userId) {
            visitor.userId = user._id;
            visitor.registered = true;
            visitor.events.push({
                type: "register_complete",
                timestamp: new Date(),
            });
            await visitor.save();
        }
    }

    return user;
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    updateCurrentUser,
    googleLogin,
};