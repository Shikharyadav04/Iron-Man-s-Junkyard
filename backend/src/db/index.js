import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// creating fuction to connect to database

const connectDB = async () => {
  try {
    const DbConnection = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );

    // giving message to connect database with host path
    console.log(
      `\n MongoDB connection established : ${DbConnection.connection.host} `
    );
  } catch (error) {
    console.log("Database connection failed", error);
    throw error;
  }
};

export default connectDB;
