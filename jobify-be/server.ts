import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "./api/index.js";
import { v2 as cloudinary } from "cloudinary";
// Public
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
// Routes
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
// Errors
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
// Constants, enums, types
import { StatusCode } from "./enum/index.js";
import { API_URL } from "./const/index.js";
// Middlewares
import { authenticateUser } from "./middleware/index.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app: Express = express();
const port = process.env.PORT || 5100;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "public")));

console.log(path.resolve(__dirname, "public"));
app.use(`${API_URL}/jobs`, authenticateUser, jobRouter);
app.use(`${API_URL}/users`, authenticateUser, userRouter);
app.use(`${API_URL}/auth`, authRouter);

app.use("*", (_req: Request, res: Response) => {
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
