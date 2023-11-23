import { RequestHandler } from "express";
import { body, param } from "express-validator";
import mongoose from "mongoose";

import { JobStatus, JobType } from "../enum/index.js";
import { BadRequestError, NotFoundError } from "../error/index.js";
import { JobBackendModel } from "../types/index.js";
import { withValidationError } from "./validationHandlerMiddleware.js";
import Job from "../models/JobModel.js";

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
