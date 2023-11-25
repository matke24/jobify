import jws, { JwtPayload } from "jsonwebtoken";
import { JWToken } from "../types/index.js";

export const createJWT = (payload: JWToken) => {
  return jws.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyJWT = (token: string): JwtPayload | string => {
  return jws.verify(token, process.env.JWT_SECRET as string);
};
