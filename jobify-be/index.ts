import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "./api/index.js";

//Routes
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";

// Errors
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

// Constants, enums, types
import { StatusCode } from "./enum/index.js";

// Middlewares
import { authenticateUser } from "./middleware/index.js";

const app: Express = express();
const port = process.env.PORT || 5100;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from server");
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);

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
