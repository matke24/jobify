import { Request, Response } from "express";
import User from "../models/UserModel.js";
import { StatusCode, UserRole } from "../enum/index.js";
import { comparePasswords, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../error/customErrors.js";
import { UserBackendModel } from "../types/user-types.js";

export const registerController = async (req: Request, res: Response) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? UserRole.ADMIN : UserRole.USER;

  req.body.password = await hashPassword(req.body.password);

  await User.create(req.body);
  res.status(StatusCode.CREATED).send({ message: "User created" });
};

export const loginController = async (req: Request, res: Response) => {
  const user: UserBackendModel | null = await User.findOne({
    email: req.body.email,
  });
  const isUserValid: boolean | null =
    user && (await comparePasswords(req.body.password, user.password));

  if (!isUserValid) {
    throw new UnauthenticatedError("User does not exist");
  }
  res.send("Login");
};
