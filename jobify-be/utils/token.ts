import jws from "jsonwebtoken";
import { JWSToken } from "../types/index.js";

export const createJWT = (payload: JWSToken) => {
  return jws.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
