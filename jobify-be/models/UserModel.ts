import mongoose from "mongoose";
import { UserBackendModel } from "../types/user-types.js";
import { UserRole } from "../enum/user.js";
import exp from "constants";

const UserSchema = new mongoose.Schema<UserBackendModel>({
  fname: String,
  lname: String,
  email: String,
  password: String,
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole.USER,
  },
});

export default mongoose.model("User", UserSchema);
