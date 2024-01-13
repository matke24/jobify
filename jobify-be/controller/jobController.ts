import "express-async-errors";
import { Request, Response } from "express";

import { JobBackendModel, UserBackendModel } from "../types";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
import { StatusCode, UserRole } from "../enum/index.js";
import { SUCCESSFULLY_UPDATED, TEST_USER } from "../const/index.js";
import { setAuthorNames } from "../utils/index.js";

export const getAllJobs = async (req: Request, res: Response) => {
  const isUserAdmin = req.user && req.user.role === UserRole.ADMIN;
  const query = isUserAdmin
    ? { author: { $ne: TEST_USER } }
    : {
        author: req.user?.userId,
      };
  const jobs: JobBackendModel[] | null = await Job.find(query);
  const users: UserBackendModel[] | null = await User.find({});
  const jobsWithName: JobBackendModel[] | null = setAuthorNames(jobs, users);

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
