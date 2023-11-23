import mongoose, { Schema } from "mongoose";

import { JobBackendModel } from "../types";
import { JobStatus, JobType } from "../enum/index.js";

const JobSchema = new Schema<JobBackendModel>(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JobStatus),
      default: JobStatus.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JobType),
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
