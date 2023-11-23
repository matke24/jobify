import { Request, Response } from "express";
import User from "../models/UserModel.js";
import { UserBackendModel } from "../types/index.js";
import { StatusCode, UserRole } from "../enum/index.js";

export const registerController = async (req: Request, res: Response) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? UserRole.ADMIN : UserRole.USER;
  const user: UserBackendModel = await User.create(req.body);
  res.status(StatusCode.CREATED).send({ user });
};

export const loginController = async (req: Request, res: Response) => {
  res.send("Login");
};
