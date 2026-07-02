const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const User = require("./src/models/User");

const makeAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB.");

        const email = "anupama@gmail.com";
        const password = "admin@1234";
        const firstName = "Anupama";
        const lastName = "Satbai";
        const phone = "9561880256";

        let user = await User.findOne({ email });
        
        if (user) {
            console.log("User found. Updating details and role to admin...");
            user.firstName = firstName;
            user.lastName = lastName;
            user.phone = phone;
            user.role = "admin";
            user.password = password; // Pre-save hook will hash this
            await user.save();
            console.log("User updated successfully to admin.");
        } else {
            console.log("User not found. Creating new admin user...");
            user = new User({
                firstName,
                lastName,
                email,
                phone,
                password,
                role: "admin",
            });
            await user.save();
            console.log("Admin user created successfully.");
        }
        process.exit(0);
    } catch (error) {
        console.error("Error making admin:", error);
        process.exit(1);
    }
};

makeAdmin();
