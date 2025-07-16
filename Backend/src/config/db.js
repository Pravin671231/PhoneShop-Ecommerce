const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connneted host ${conn.connection.host}`);
  } catch (error) {
    console.log("Error in connectDB");
    console.error("MongoDB conneted failed", error);
    process.exit(1)
  }
};
module.exports = connectDB;
