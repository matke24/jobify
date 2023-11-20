import {
  body,
  param,
  validationResult,
  ValidationChain,
} from "express-validator";
import mongoose from "mongoose";
import { BadRequestError } from "../error/customErrors.js";
import { NextFunction, RequestHandler } from "express";
import { JobStatus, JobType } from "../enum/job.js";

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

export const validateJobInput: RequestHandler[] = withValidationError([
  body("company").notEmpty().withMessage("Company is required"),
  body("position").notEmpty().withMessage("Position is required"),
  body("jobLocation").notEmpty().withMessage("Location is required"),
  body("jobStatus")
    .isIn(Object.values(JobStatus))
    .withMessage("Invalid status value"),
  body("jobType")
    .isIn(Object.values(JobType))
    .withMessage("Invalid type value"),
]);

export const validateJobId: RequestHandler[] = withValidationError([
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid ID"),
]);
