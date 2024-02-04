import { DEFAULT_STATS } from "../const/index.js";
import { JobStatsDbResponse, JobStats } from "../types/index.js";
import Job from "../models/JobModel.js";

export const getUserJobStats = async (match: any): Promise<JobStats> => {
  const dbStats: JobStatsDbResponse[] = await Job.aggregate([
    { $match: match },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  const stats: JobStats = dbStats.reduce(
    (acc: JobStats, job: JobStatsDbResponse) => {
      const { _id: title, count } = job;
      acc.totalJobs += count;
      acc[title] = count;
      return acc;
    },
    DEFAULT_STATS
  );

  return stats;
};
