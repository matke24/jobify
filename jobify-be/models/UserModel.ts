import mongoose from "mongoose";
import { UserBackendModel } from "../types/index.js";
import { UserRole } from "../enum/index.js";
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
