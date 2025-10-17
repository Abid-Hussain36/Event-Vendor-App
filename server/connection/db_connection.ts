import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async () => {
  try {
    dotenv.config();
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (err) {
    console.log("Error in connecting to MongoDB: ", err);
    process.exit(1);
  }
};
