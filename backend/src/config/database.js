const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  console.log("🌐 Attempting DB connection to:", process.env.MONGO_URI);

  try {
    await mongoose.connect(process.env.MONGO_URI, {
     
    });
    console.log("✅ MongoDB Connected");

    mongoose.connection.on("error", (err) => {
      console.error("❌ Mongoose runtime error:", err);
    });
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
  }
};

module.exports = connectDB;
