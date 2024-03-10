import jws, { JwtPayload } from "jsonwebtoken";
import { JWToken } from "../types/index.js";
import { environment } from "../config.js";

const { token_master_key, token_expiry } = environment();

export const createJWT = (payload: JWToken) => {
  return jws.sign(payload, token_master_key as string, {
    expiresIn: token_expiry,
  });
};

export const verifyJWT = (token: string): JwtPayload | string => {
  return jws.verify(token, token_master_key as string);
};
