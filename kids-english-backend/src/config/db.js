const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/kids_english");
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;