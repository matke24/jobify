import { environment } from "../config.js";
import mongoose from "mongoose";
import { exit } from "process";

const { database_key } = environment();

export const db_connect = async () => {
  try {
    await mongoose.connect(database_key as string);
  } catch {
    console.log("Error connecting to database");
    exit(1);
  }
};
