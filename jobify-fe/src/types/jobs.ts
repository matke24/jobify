import { JobSort, JobStatus, JobType } from "../enum";

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

export interface Pagination {
  totalPages: number;
  currentPage: number;
  totalJobs: number;
}

export interface JobsWithPagination {
  jobs: JobData[];
  pagination: Pagination;
  searchValue?: JobRequestParams;
}
export interface Job {
  job: JobData;
}

export interface JobRequestParams {
  search?: string;
  jobType?: JobType;
  jobStatus?: JobStatus;
  sort?: JobSort;
}

// TODO: fix everything above this line

export interface JobStats {
  pending: number;
  declined: number;
  hired: number;
  interview: number;
  totalJobs: number;
}

export interface MonthlyStats {
  date: string;
  count: number;
}

export interface JobStatistics {
  stats: JobStats;
  monthlyStats: MonthlyStats[];
}
