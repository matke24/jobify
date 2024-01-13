import { JobStatus, JobType } from "../enum";

export interface JobData {
  _id: string;
  company: string;
  position: string;
  jobStatus: JobStatus;
  jobType: JobType;
  jobLocation: string;
  author: string;
  authorName?: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Jobs {
  jobs: JobData[];
}
export interface Job {
  job: JobData;
}
