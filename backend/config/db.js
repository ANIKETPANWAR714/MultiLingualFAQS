const mongoose = require("mongoose");
const FAQ = require("../models/FAQ");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongodb connected");
  } catch (error) {
    console.log("MongoDB connection error :", error);
  }
};
module.exports = connectDB;
