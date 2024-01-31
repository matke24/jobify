import "express-async-errors";
import { Request, Response } from "express";

import {
  JWToken,
  JobBackendModel,
  JobStats,
  JobStatsDbResponse,
  UserBackendModel,
} from "../types";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
import { StatusCode, UserRole } from "../enum/index.js";
import {
  DEFAULT_STATS,
  SUCCESSFULLY_UPDATED,
  TEST_USER,
} from "../const/index.js";
import { isUserAdmin, setAuthorNames } from "../utils/index.js";
import mongoose from "mongoose";

export const getAllJobs = async (req: Request, res: Response) => {
  const query = isUserAdmin(req.user as JWToken)
    ? { author: { $ne: TEST_USER } }
    : {
        author: req.user?.userId,
      };
  const jobs: JobBackendModel[] = await Job.find(query);
  const users: UserBackendModel[] = await User.find({});
  const jobsWithName: JobBackendModel[] = setAuthorNames(jobs, users);

  res.status(StatusCode.OK).json({ jobs: jobsWithName });
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
    ? {
        author: {
          $ne: new mongoose.Types.ObjectId(TEST_USER),
        },
      }
    : {
        author: req.user && new mongoose.Types.ObjectId(req.user.userId),
      };

  const dbStats: JobStatsDbResponse[] = await Job.aggregate([
    {
      $match: match,
    },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  const stats: JobStats = dbStats.reduce(
    (acc: JobStats, job: JobStatsDbResponse) => {
      const { _id: title, count } = job;
      acc.totalJobs += count;
      acc[title] = count;
      return acc;
    },
    {
      ...DEFAULT_STATS,
    }
  );
  return res.status(StatusCode.OK).json({ stats });
};
