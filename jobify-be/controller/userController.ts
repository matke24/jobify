import { Request, Response } from "express";
import { StatusCode } from "../enum/index.js";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?.userId);
  const userToJSON = user?.toJSON();
  res.status(StatusCode.OK).json({ user: userToJSON });
};

export const getAppStats = async (req: Request, res: Response) => {
  res.status(StatusCode.OK).json({ message: "get app status" });
};

export const updateUser = async (req: Request, res: Response) => {
  const obj = { ...req.body };
  delete obj.password;
  await User.findByIdAndUpdate(req.user?.userId, obj);
  res.status(StatusCode.OK).json({ message: "update user" });
};
