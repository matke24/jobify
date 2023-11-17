import { nanoid } from "nanoid";
import { Job } from "../types";
import { Request, Response } from "express";

let jobs: Job[] = [
  {
    id: nanoid(10),
    company: "apple",
    position: "front-end",
  },
  {
    id: nanoid(10),
    company: "samsung",
    position: "backend-end",
  },
];

export const getAllJobs = async (req: Request, res: Response) => {
  res.status(200).json({ jobs });
};

export const createJob = async (req: Request, res: Response) => {
  const { company, position } = req.body;

  if (!company || !position) {
    return res
      .status(400)
      .json({ message: "Please provide company and position" });
  }

  const id = nanoid(10);
  const job: Job = {
    id,
    company,
    position,
  };
  jobs.push(job);
  res.status(201).json({ job });
};

export const getSingleJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const job: Job | undefined = jobs.find((job: Job) => job.id === id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.status(200).json({ job });
};

export const editJob = async (req: Request, res: Response) => {
  const { company, position }: Job = req.body;

  if (!company || !position) {
    return res
      .status(400)
      .json({ message: "Please provide company and position" });
  }

  const { id } = req.params;
  const job: Job | undefined = jobs.find((job: Job) => job.id === id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  job.company = company;
  job.position = position;

  res.status(200).json({ message: "Successfully updated", job });
};

export const deleteJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const job: Job | undefined = jobs.find((job: Job) => job.id === id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  const updatedJobsList: Job[] = jobs.filter((job: Job) => job.id !== id);
  jobs = updatedJobsList;
  res.status(200).json({ message: "Successfully deleted", jobs });
};
