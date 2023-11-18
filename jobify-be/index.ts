import dotenv from "dotenv";
dotenv.config();

import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { connect } from "./api/db-connect.js";

//Routes
import jobRouter from "./routes/jobRouter.js";
import { StatusCode } from "./enum/status-code.js";

const app: Express = express();
const port = process.env.PORT || 5100;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from server");
});

app.use("/api/v1/jobs", jobRouter);

app.use("*", (req: Request, res: Response) => {
  res.status(StatusCode.NOT_FOUND).json({ message: "Resource not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res
    .status(StatusCode.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal server error" });
});

try {
  connect();
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
} catch (err) {
  console.log(err);
  process.exit(1);
}
