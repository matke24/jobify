import { UserRole } from "../enum/user.js";

export interface UserBackendModel {
  fname: string;
  lname: string;
  email: string;
  password: string;
  location: string;
  role: UserRole;
}
