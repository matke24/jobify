import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../error/index.js";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_token } = req.cookies;
  if (!user_token) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  next();
};
