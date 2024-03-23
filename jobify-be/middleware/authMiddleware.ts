import { Request, Response, NextFunction } from "express";
import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../error/index.js";
import { verifyJWT } from "../utils/token.js";
import { JWToken } from "../types/index.js";
import { TEST_USER } from "../const/user-const.js";

export const authenticateUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { user_token } = req.cookies;
  try {
    const { userId, role }: JWToken = verifyJWT(user_token) as JWToken;
    const isTestUser = userId === TEST_USER;
    req.user = { userId, role, isTestUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export const authorizePermission = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && !roles.includes(req.user.role)) {
      throw new UnauthorizedError(
        "You are not authorized to access this page."
      );
    }
    next();
  };
};

export const checkIsTestUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.isTestUser) {
    throw new BadRequestError("Test user. Read ONLY!");
  }
  next();
};
