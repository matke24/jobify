import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { nanoid } from "nanoid";
import { Job } from "./utils/props.js";

const app: Express = express();
const port = process.env.PORT || 5100;

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

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// GET JOBS
app.get("/api/v1/jobs", (req: Request, res: Response) => {
  res.status(200).json({ jobs });
});

// GET SINGLE JOB
app.get("/api/v1/jobs/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const job: Job | undefined = jobs.find((job: Job) => job.id === id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.status(200).json({ job });
});

// UPDATE JOB
app.patch("/api/v1/jobs/:id", (req: Request, res: Response) => {
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
});
// DELETE JOB
app.delete("/api/v1/jobs/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const job: Job | undefined = jobs.find((job: Job) => job.id === id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  const updatedJobsList: Job[] = jobs.filter((job: Job) => job.id !== id);
  jobs = updatedJobsList;
  res.status(200).json({ message: "Successfully deleted", jobs });
});

// CREATE JOB
app.post("/api/v1/jobs", (req: Request, res: Response) => {
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
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
