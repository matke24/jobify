import { UserRole } from "../enum/index.js";

export interface JWSToken {
  userId: string;
  role: UserRole;
}
