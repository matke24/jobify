import "express-async-errors";
import mongoose, { QueryOptions } from "mongoose";
import { Request, Response } from "express";

import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

import {
  JWToken,
  JobBackendModel,
  JobMonthlyStats,
  JobStats,
  UserBackendModel,
} from "../types";
import { JobSort, StatusCode } from "../enum/index.js";
import {
  SUCCESSFULLY_UPDATED,
  TEST_USER,
  sortOptions,
} from "../const/index.js";
import {
  getJobMonthlyStats,
  getUserJobStats,
  handlePagination,
  isUserAdmin,
  setAuthorNames,
} from "../utils/index.js";

export const getAllJobs = async (req: Request, res: Response) => {
  const { search, jobStatus, jobType, showJobs, page } = req.query;
  const query: QueryOptions = isUserAdmin(req.user as JWToken)
    ? {
        author: { $ne: TEST_USER },
      }
    : {
        author: req.user?.userId,
      };

  if (search) {
    query.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    query.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    query.jobType = jobType;
  }

  const sortKey = sortOptions.get(
    (req.query.sort as JobSort) || JobSort.NEWEST_FIRST
  );

  const totalJobs: number = await Job.countDocuments(query);
  const { skip, limit, totalPages, currentPage } = handlePagination(
    totalJobs,
    page as string,
    showJobs as string
  );

  const jobs: JobBackendModel[] = await Job.find(query)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);
  const users: UserBackendModel[] = await User.find({});
  const jobsWithName: JobBackendModel[] = setAuthorNames(jobs, users);

  res.status(StatusCode.OK).json({
    totalJobs: totalJobs,
    totalPages: totalPages,
    currentPage: currentPage,
    jobs: jobsWithName,
  });
};

export const getSingleJob = async (req: Request, res: Response) => {
  const job: JobBackendModel | null = await Job.findById(req.params.id);
  res.status(StatusCode.OK).json({ job });
};

export const createJob = async (req: Request, res: Response) => {
  req.body.author = req.user?.userId;
  const job: JobBackendModel | null = await Job.create(req.body);
  res.status(StatusCode.CREATED).json({ job });
};

export const editJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const editedJob: JobBackendModel | null = await Job.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  );
  res
    .status(StatusCode.OK)
    .json({ message: SUCCESSFULLY_UPDATED, job: editedJob });
};

export const deleteJob = async (req: Request, res: Response) => {
  const removedJob: JobBackendModel | null = await Job.findByIdAndDelete(
    req.params.id
  );
  res
    .status(StatusCode.OK)
    .json({ message: "Successfully deleted", job: removedJob });
};

export const jobStats = async (req: Request, res: Response) => {
  const match = isUserAdmin(req.user as JWToken)
    ? { author: { $ne: new mongoose.Types.ObjectId(TEST_USER) } }
    : { author: req.user && new mongoose.Types.ObjectId(req.user.userId) };

  const stats: JobStats = await getUserJobStats(match);
  const monthlyStats: JobMonthlyStats[] = await getJobMonthlyStats(match);
  return res.status(StatusCode.OK).json({ stats, monthlyStats });
};
