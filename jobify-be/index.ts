import dotenv from "dotenv";
dotenv.config();

import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { connect } from "./api/db-connect.js";

//Routes
import jobRouter from "./routes/jobRouter.js";
import { StatusCode } from "./enum/status-code.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { validateTest } from "./middleware/validationHandlerMiddleware.js";

const app: Express = express();
const port = process.env.PORT || 5100;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.post("/api/v1/test", validateTest, (req: Request, res: Response) => {
  const { name } = req.body;
  res.json({ message: `Hello ${name}` });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from server");
});

app.use("/api/v1/jobs", jobRouter);

app.use("*", (req: Request, res: Response) => {
  res.status(StatusCode.NOT_FOUND).json({ message: "Resource not found" });
});

app.use(errorHandlerMiddleware);

try {
  connect();
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
} catch (err) {
  console.log(err);
  process.exit(1);
}
