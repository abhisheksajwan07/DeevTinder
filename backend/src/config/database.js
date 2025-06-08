const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("Mongo URI is not defined in environment variables");
    }
    console.log(uri)
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
  }
};

module.exports = connectDB;
