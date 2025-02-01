require("dotenv").config();

const mongoose = require("mongoose");

const MONGO_URI = process.env.DB_STRING;

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...", MONGO_URI);
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: haha`);
    process.exit(1);
  }
};

module.exports = connectDB;