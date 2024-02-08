import { DEFAULT_STATS } from "../const/index.js";
import {
  JobStatsDbResponse,
  JobStats,
  JobMonthlyStats,
  MonthlyJobStatsDbResponse,
} from "../types/index.js";
import Job from "../models/JobModel.js";
import { match } from "assert";
import dayjs from "dayjs";

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

export const getJobMonthlyStats = async (
  match: any
): Promise<JobMonthlyStats[]> => {
  const monthlyStatsDbResponse: MonthlyJobStatsDbResponse[] =
    await Job.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]);

  const monthlyStats: JobMonthlyStats[] = monthlyStatsDbResponse
    .map((stat) => {
      const {
        _id: { month, year },
        count,
      } = stat;
      const date = dayjs()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return {
        date,
        count,
      };
    })
    .reverse();

  return monthlyStats;
};
