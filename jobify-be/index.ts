import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { nanoid } from "nanoid";

const app: Express = express();
const port = process.env.PORT || 5100;

let jobs = [
  {
    id: nanoid(),
    company: "apple",
    position: "front-end",
  },
  {
    id: nanoid(),
    company: "samsung",
    position: "backend-end",
  },
];

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api/v1/jobs", (req: Request, res: Response) => {
  res.status(200).json(jobs);
});

app.post("/", (req: Request, res: Response) => {
  res.json({ message: "data received", data: req.body });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
