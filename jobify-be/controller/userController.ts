import { Request, Response } from "express";
import { StatusCode } from "../enum/index.js";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";

export const getCurrentUser = async (req: Request, res: Response) => {
  res.status(StatusCode.OK).json({ message: "get current user" });
};

export const getAppStats = async (req: Request, res: Response) => {
  res.status(StatusCode.OK).json({ message: "get app status" });
};

export const updateUser = async (req: Request, res: Response) => {
  res.status(StatusCode.OK).json({ message: "update user" });
};
