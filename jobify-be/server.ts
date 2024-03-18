import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { db_connect } from "./api/index.js";
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
import { environment } from "./config.js";

const {
  environmentMode,
  server_port,
  cloud,
  cloud_master_key,
  cloud_secret_key,
} = environment();

cloudinary.config({
  cloud_name: cloud,
  api_key: cloud_master_key,
  api_secret: cloud_secret_key,
});

const app: Express = express();
const port = server_port || 5100;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../public")));

if (environmentMode === "development") {
  app.use(morgan("dev"));
}

app.use(`${API_URL}/jobs`, authenticateUser, jobRouter);
app.use(`${API_URL}/users`, authenticateUser, userRouter);
app.use(`${API_URL}/auth`, authRouter);

app.get("/*", (_req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

app.use(errorHandlerMiddleware);

try {
  db_connect();
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
} catch (err) {
  console.log(err);
  process.exit(1);
}
