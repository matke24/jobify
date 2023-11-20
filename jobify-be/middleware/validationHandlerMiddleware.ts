import {
  body,
  param,
  validationResult,
  ValidationChain,
} from "express-validator";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../error/customErrors.js";
import { NextFunction, RequestHandler } from "express";
import { JobStatus, JobType } from "../enum/job.js";
import { JobBackendModel } from "../types/index.js";
import Job from "../models/JobModel.js";

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
        if (errorMessage[0].toLowerCase().startsWith("cannot")) {
          throw new NotFoundError(errorMessage[0] as string);
        }
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

export const validateIdParam: RequestHandler[] = withValidationError([
  param("id").custom(async (jobID) => {
    const isIDValid = mongoose.Types.ObjectId.isValid(jobID);
    if (!isIDValid) {
      throw new BadRequestError("Invalid ID");
    }

    const job: JobBackendModel | null = await Job.findById(jobID);
    if (!job) {
      throw new NotFoundError(`Cannot find a job with id: ${jobID}`);
    }
  }),
]);
