const { MONGOURI } = require("../constants/app.constants")
const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(MONGOURI);
        console.log("mongodb connected succesfully")
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // Stop the server if DB connection fails

    }
}

module.exports = connectDB;