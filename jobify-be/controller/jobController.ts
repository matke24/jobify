import "express-async-errors";
import { Request, Response } from "express";

import { JobBackendModel } from "../types";
import Job from "../models/JobModel.js";
import { StatusCode } from "../enum/status-code.js";
import { NotFoundError } from "../error/NotFoundError.js";
import { CANNOT_CREATE_JOB, SUCCESSFULLY_UPDATED } from "../const/job-const.js";

export const getAllJobs = async (req: Request, res: Response) => {
  const jobs: JobBackendModel[] | null = await Job.find({});
  res.status(StatusCode.OK).json({ jobs });
};

export const getSingleJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const job: JobBackendModel | null = await Job.findById(id);

  if (!job) {
    throw new NotFoundError(`Cannot find a job with id: ${id}`);
  }
  res.status(StatusCode.OK).json({ job });
};

export const createJob = async (req: Request, res: Response) => {
  const job: JobBackendModel | null = await Job.create(req.body);

  if (!job) {
    throw new NotFoundError(CANNOT_CREATE_JOB);
  }

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

  if (!editJob) {
    throw new NotFoundError(`Cannot find a job with id: ${id}`);
  }

  res
    .status(StatusCode.OK)
    .json({ message: SUCCESSFULLY_UPDATED, job: editedJob });
};

export const deleteJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const removedJob: JobBackendModel | null = await Job.findByIdAndDelete(id);

  if (!removedJob) {
    throw new NotFoundError(`Cannot find a job with id: ${id}`);
  }
  res
    .status(StatusCode.OK)
    .json({ message: "Successfully deleted", job: removedJob });
};
