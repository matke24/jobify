import {
  JobStatsDbResponse,
  JobStats,
  JobMonthlyStats,
  JobPagination,
  MonthlyJobStatsDbResponse,
} from "../types/index.js";
import Job from "../models/JobModel.js";
import dayjs from "dayjs";
import { BadRequestError } from "../error/customErrors.js";

export const getUserJobStats = async (match: any): Promise<JobStats> => {
  const dbStats: JobStatsDbResponse[] = await Job.aggregate([
    { $match: match },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  const DEFAULT_STATS = {
    pending: 0,
    interview: 0,
    hired: 0,
    declined: 0,
    totalJobs: 0,
  };
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

export const handlePagination = (
  totalJobs: number,
  page: string,
  showJobs: string
): JobPagination => {
  const currentPage = parseInt(page as string) || 1;
  const limit = parseInt(showJobs as string) || 10;
  const skip = (currentPage - 1) * limit;
  const totalPages = Math.ceil(totalJobs / limit);

  if (limit < 0 || currentPage < 0) {
    throw new BadRequestError("Invalid page or limit");
  }

  return { currentPage, limit, skip, totalPages };
};
