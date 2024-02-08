import { JobStatistics } from "../types";

export const UPLOAD_IMAGE_SIZE_LIMIT = 524_288;

export const defaultStatsContext: JobStatistics = {
  stats: {
    pending: 0,
    declined: 0,
    hired: 0,
    interview: 0,
    totalJobs: 0,
  },
  monthlyStats: [],
};
