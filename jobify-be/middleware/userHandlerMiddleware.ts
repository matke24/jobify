import { Request } from "express";
import { body } from "express-validator";
import User from "../models/UserModel.js";
import { withValidationError } from "./index.js";
import { BadRequestError } from "../error/customErrors.js";

export const validateUserRegistration = withValidationError([
  body("fname").notEmpty().withMessage("First name is required"),
  body("lname").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email name is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password name is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("location").notEmpty().withMessage("Location name is required"),
]);

export const validateUserLogin = withValidationError([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
]);

export const validateUpdateUserInput = withValidationError([
  body("fname").notEmpty().withMessage("First name is required"),
  body("lname").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email name is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email, { req }: { req: any }) => {
      const user = await User.findOne({ email });
      if (user && req.user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("Email already exists");
      }
    }),
  body("location").notEmpty().withMessage("Location name is required"),
]);
