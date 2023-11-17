export enum JobStatus {
  PENDING = "pending",
  DECLINED = "declined",
  HIRED = "hired",
  INTERVIEW = "interview",
}

export enum JobType {
  FULL_TIME = "full-time",
  PART_TIME = "part-time",
  HYBRID = "hybrid",
  REMOTE = "remote",
  INTERNSHIP = "internship",
}

export interface JobModel {
  id?: string;
  company: string;
  position: string;
  jobStatus: JobStatus;
  jobType: JobType;
  jobLocation: string;
}
