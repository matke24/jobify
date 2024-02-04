import { RequestHandler } from "express";
import { body, param } from "express-validator";
import mongoose from "mongoose";

import { JobStatus, JobType } from "../enum/index.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../error/index.js";
import { JWToken, JobBackendModel } from "../types/index.js";
import { withValidationError } from "./validationHandlerMiddleware.js";
import Job from "../models/JobModel.js";
import { isUserAdmin } from "../utils/index.js";

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
  param("id").custom(async (jobID, { req }) => {
    const isIDValid = mongoose.Types.ObjectId.isValid(jobID);
    if (!isIDValid) {
      throw new BadRequestError("Invalid ID");
    }

    const job: JobBackendModel | null = await Job.findById(jobID);
    if (!job) {
      throw new NotFoundError(`Cannot find a job with id: ${jobID}`);
    }

    const isUserAuthor = req.user.userId === job.author.toString();

    if (!isUserAdmin(req.user as JWToken) && !isUserAuthor) {
      throw new UnauthorizedError("Not authorized to access this route");
    }
  }),
]);
