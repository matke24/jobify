import { Request, Response } from "express";
import User from "../models/UserModel.js";
import { StatusCode, UserRole } from "../enum/index.js";
import { comparePasswords, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../error/customErrors.js";
import { UserBackendModel } from "../types/user.types.js";
import { createJWT } from "../utils/token.js";
import { ONE_DAY_IN_MS, COOKIE_NAME, TEST_USER } from "../const/index.js";
import { environment } from "../config.js";

const { environmentMode } = environment();

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

  const token = createJWT({
    userId: user!._id,
    role: user!.role,
    isTestUser: user!._id === TEST_USER,
  });

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY_IN_MS),
    secure: environmentMode === "production",
  });
  res.status(StatusCode.OK).json({ message: "Success" });
};

export const logoutController = (req: Request, res: Response) => {
  res.cookie(COOKIE_NAME, "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCode.OK).json({ message: "Logout successful" });
};
