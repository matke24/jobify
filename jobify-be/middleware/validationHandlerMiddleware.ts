import { body, validationResult, ValidationChain } from "express-validator";
import { BadRequestError } from "../error/customErrors.js";
import { NextFunction, RequestHandler } from "express";
import {
  EMPTY_NAME_ERROR_MESSAGE,
  NAME_LENGTH_ERROR_MESSAGE,
} from "../const/job-const.js";

const withValidationError = (
  validateValues: ValidationChain[]
): RequestHandler[] =>
  [
    validateValues,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        /* 
            errorMessage gets an array of strings,
            to throw new Error use errorMessage[0],
            user should resolve errors one by one
        */
        const errorMessage = errors.array().map((err) => err.msg);
        throw new BadRequestError(errorMessage[0]);
      }
      next();
    },
  ] as any;

export const validateTest: RequestHandler[] = withValidationError([
  body("name")
    .notEmpty()
    .withMessage(EMPTY_NAME_ERROR_MESSAGE)
    .isLength({ min: 3, max: 50 })
    .withMessage(NAME_LENGTH_ERROR_MESSAGE)
    .trim(),
]);
