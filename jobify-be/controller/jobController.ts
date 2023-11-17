import "express-async-errors";
import { Request, Response } from "express";

import { JobModel } from "../types";
import Job from "../models/JobModel.js";
let jobs: JobModel[] = [
  // {
  //   id: nanoid(10),
  //   company: "apple",
  //   position: "front-end",
  // },
  // {
  //   id: nanoid(10),
  //   company: "samsung",
  //   position: "backend-end",
  // },
];

export const getAllJobs = async (req: Request, res: Response) => {
  res.status(200).json({ jobs });
};

export const createJob = async (req: Request, res: Response) => {
  const job = await Job.create(req.body);
  res.status(201).json({ job });
};

export const getSingleJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const job: JobModel | undefined = jobs.find((job: JobModel) => job.id === id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.status(200).json({ job });
};

export const editJob = async (req: Request, res: Response) => {
  const { company, position }: JobModel = req.body;

  if (!company || !position) {
    return res
      .status(400)
      .json({ message: "Please provide company and position" });
  }

  const { id } = req.params;
  const job: JobModel | undefined = jobs.find((job: JobModel) => job.id === id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  job.company = company;
  job.position = position;

  res.status(200).json({ message: "Successfully updated", job });
};

export const deleteJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const job: JobModel | undefined = jobs.find((job: JobModel) => job.id === id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  const updatedJobsList: JobModel[] = jobs.filter(
    (job: JobModel) => job.id !== id
  );
  jobs = updatedJobsList;
  res.status(200).json({ message: "Successfully deleted", jobs });
};
