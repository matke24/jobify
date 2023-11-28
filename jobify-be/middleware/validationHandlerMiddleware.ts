import { validationResult, ValidationChain } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../error/index.js";
import { NextFunction, RequestHandler } from "express";

export const withValidationError = (
  validateValues: ValidationChain[]
): RequestHandler[] =>
  [
    validateValues,
    (req: Request, _res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        /* 
            errorMessage gets an array of strings,
            to throw new Error use errorMessage[0],
            user should resolve errors one by one
        */
        const errorMessage = errors.array().map((err) => err.msg);
        if (errorMessage[0].toLowerCase().startsWith("cannot")) {
          throw new NotFoundError(errorMessage[0]);
        }

        if (errorMessage[0].toLowerCase().startsWith("not authorized")) {
          throw new UnauthorizedError(errorMessage[0]);
        }
        throw new BadRequestError(errorMessage[0]);
      }
      next();
    },
  ] as any;
