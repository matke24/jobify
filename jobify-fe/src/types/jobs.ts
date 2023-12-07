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

export interface JobLoader {
  data: JobData[];
}

export interface JobsContext {
  data: {
    jobs: JobData[];
  };
}
