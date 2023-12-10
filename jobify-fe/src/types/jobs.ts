export interface JobData {
  _id: string;
  company: string;
  position: string;
  jobStatus: "hired";
  jobType: "full-time";
  jobLocation: string;
  author: string;
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
