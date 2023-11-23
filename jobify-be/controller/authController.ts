import { Request, Response } from "express";

export const registerController = async (req: Request, res: Response) => {
  res.send("Register");
};

export const loginController = async (req: Request, res: Response) => {
  res.send("Login");
};
