import dotenv from "dotenv";
dotenv.config();

import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";

//Routes
import jobRouter from "./routes/jobRouter.js";

const app: Express = express();
const port = process.env.PORT || 5100;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/v1/jobs", jobRouter);

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Resource not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
