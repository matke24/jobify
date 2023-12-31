import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";

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
  const userCount = await User.countDocuments();
  const jobCount = await Job.countDocuments();
  res.status(StatusCode.OK).json({ users: userCount, jobs: jobCount });
};

export const updateUser = async (req: Request, res: Response) => {
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user?.userId, newUser);

  if (req.file && updatedUser?.avatarPublicId) {
    cloudinary.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCode.OK).json({ message: "update user" });
};
