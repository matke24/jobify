import { JobStatus, JobType } from "../enum/job.js";

export interface JobBackendModel {
  _id: string;
  company: string;
  position: string;
  jobStatus: JobStatus;
  jobType: JobType;
  jobLocation: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
}
