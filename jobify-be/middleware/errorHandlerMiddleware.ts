import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../enum/index.js";
import { ErrorType } from "../types/index.js";

const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again later.";

const errorHandlerMiddleware = (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err?.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
  const message = err.message || DEFAULT_ERROR_MESSAGE;
  res.status(statusCode).json({ message });
};

export default errorHandlerMiddleware;
