import { Request } from "express";
import { JWToken } from "../types/index.js";

declare module "express-serve-static-core" {
  interface Request extends Request {
    user?: JWToken;
  }
}
