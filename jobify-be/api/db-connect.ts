import mongoose from "mongoose";
import { exit } from "process";

export const db_connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
  } catch {
    console.log("Error connecting to database");
    exit(1);
  }
};
