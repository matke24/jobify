import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../enum/index.js";

export interface JWToken {
  userId: string;
  role: UserRole;
}

export interface DecodedJWToken extends JWToken, JwtPayload {}
