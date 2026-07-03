require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./src/config/db");
const User = require("./src/models/User");

const fixName = async () => {
    try {
        await connectDB();
        
        // Find users with first name or last name containing "Bharti" or "Damal"
        const users = await User.find({
            $or: [
                { firstName: { $regex: /bharti/i } },
                { lastName: { $regex: /damal/i } }
            ]
        });

        console.log(`Found ${users.length} users matching Bharti Damal`);

        for (const user of users) {
            console.log(`Updating user: ${user.firstName} ${user.lastName}`);
            user.firstName = "Anupama";
            user.lastName = ""; // Optional: remove last name if they just want Anupama
            await user.save();
            console.log(`Updated to: ${user.firstName}`);
        }

        console.log("Done updating database!");
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

fixName();
