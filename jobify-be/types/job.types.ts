import { Types } from "mongoose";
import { JobStatus, JobType } from "../enum/index.js";

export interface JobBackendModel {
  _id: string;
  company: string;
  position: string;
  jobStatus: JobStatus;
  jobType: JobType;
  jobLocation: string;
  createdAt: string;
  updatedAt: string;
  author: Types.ObjectId;
  authorName?: string;
  _v: number;
}
