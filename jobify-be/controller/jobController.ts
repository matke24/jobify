import "express-async-errors";
import { Request, Response } from "express";

import { JobBackendModel } from "../types";
import Job from "../models/JobModel.js";
import { StatusCode } from "../enum/status-code.js";

export const getAllJobs = async (req: Request, res: Response) => {
  const jobs: JobBackendModel[] | null = await Job.find({});
  res.status(StatusCode.OK).json({ jobs });
};

export const getSingleJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const job: JobBackendModel | null = await Job.findById(id);

  if (!job) {
    return res.status(StatusCode.NOT_FOUND).json({ message: "Job not found" });
  }
  res.status(StatusCode.OK).json({ job });
};

export const createJob = async (req: Request, res: Response) => {
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

  if (!editedJob) {
    return res
      .status(StatusCode.BAD_REQUEST)
      .json({ message: "Please provide company and position" });
  }
  res
    .status(StatusCode.OK)
    .json({ message: "Successfully updated", job: editedJob });
};

export const deleteJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const removedJob: JobBackendModel | null = await Job.findByIdAndDelete(id);

  if (!removedJob) {
    return res.status(StatusCode.NOT_FOUND).json({ message: "Job not found" });
  }
  res
    .status(StatusCode.OK)
    .json({ message: "Successfully deleted", job: removedJob });
};
