import { v2 as cloudinary } from "cloudinary";
import { formatImage } from "../middleware/multerMiddleware.js";

import { Request, Response, query } from "express";
import { StatusCode, UserRole } from "../enum/index.js";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import { TEST_USER } from "../const/user-const.js";
import mongoose from "mongoose";

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?.userId);
  const userToJSON = user?.toJSON();
  res.status(StatusCode.OK).json({ user: userToJSON });
};

export const getAppStats = async (req: Request, res: Response) => {
  const userCount = await User.countDocuments({
    _id: { $ne: new mongoose.Types.ObjectId(TEST_USER) },
  });
  const jobCount = await Job.countDocuments({
    author: { $ne: new mongoose.Types.ObjectId(TEST_USER) },
  });
  res.status(StatusCode.OK).json({ users: userCount, jobs: jobCount });
};

export const updateUser = async (req: Request, res: Response) => {
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const formattedImage = formatImage(req.file);

    if (!formatImage) {
      return;
    }

    const response = await cloudinary.uploader.upload(formattedImage as string);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user?.userId, newUser);

  if (req.file && updatedUser?.avatarPublicId) {
    cloudinary.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCode.OK).json({ message: "update user" });
};
