import jws from "jsonwebtoken";
import { JWSToken } from "../types/index.js";

export const createJWT = (payload: JWSToken) => {
  return jws.sign(payload, "secret", {
    expiresIn: "1d",
  });
};
