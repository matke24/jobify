import { JobStatus } from "../enum/index.js";
type MonthlyStatsId = {
  year: number;
  month: number;
};

export interface JobStatsDbResponse {
  _id: JobStatus;
  count: number;
}

export interface MonthlyJobStatsDbResponse {
  _id: MonthlyStatsId;
  count: number;
}

export interface JobStats {
  pending: number;
  declined: number;
  hired: number;
  interview: number;
  totalJobs: number;
}

export interface JobMonthlyStats {
  date: string;
  count: number;
}
