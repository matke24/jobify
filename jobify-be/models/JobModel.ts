import mongoose, { Schema } from "mongoose";

import { JobModel, JobStatus, JobType } from "../types";

const JobSchema = new Schema<JobModel>(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: JobStatus,
      default: JobStatus.PENDING,
    },
    jobType: {
      type: String,
      enum: JobType,
      default: JobType.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "Unknown",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
