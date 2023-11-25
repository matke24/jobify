import { UserRole } from "../enum/index.js";

export interface UserBackendModel {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  location: string;
  role: UserRole;
}
