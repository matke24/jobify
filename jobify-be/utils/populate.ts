import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
import { environment } from "../config.js";

const { database_key } = environment();

const getMockData = async (): Promise<string | undefined> => {
  try {
    const data = await readFile(new URL("mock_data.json", import.meta.url), {
      encoding: "utf-8",
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

const mockJobData = async () => {
  try {
    await mongoose.connect(database_key as string);
    const user = await User.findOne({ email: "test@test.com" });
    const mockedInitialData = JSON.parse((await getMockData()) as string);
    const mockedJobs = mockedInitialData.map((job: any) => {
      return { ...job, author: user?._id };
    });

    await Job.deleteMany({ author: user?._id });
    await Job.create(mockedJobs);
    console.log("success");
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(0);
  }
};

mockJobData();
