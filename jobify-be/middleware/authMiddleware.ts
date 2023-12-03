import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError, UnauthorizedError } from "../error/index.js";
import { verifyJWT } from "../utils/token.js";
import { JWToken } from "../types/index.js";

export const authenticateUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { user_token } = req.cookies;
  if (!user_token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    const { userId, role }: JWToken = verifyJWT(user_token) as JWToken;
    req.user = { userId, role };
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
