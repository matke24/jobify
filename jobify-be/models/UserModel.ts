import mongoose, { Model } from "mongoose";
import { UserBackendModel } from "../types/index.js";
import { UserRole } from "../enum/index.js";

interface UserMethods {
  toJSON: Record<string, any>;
}

/*
  Must extend model to be able to make a method on it
*/
type UserModel = Model<UserBackendModel, {}, UserMethods>;

const UserSchema = new mongoose.Schema<
  UserBackendModel,
  UserModel,
  UserMethods
>({
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

UserSchema.method("toJSON", function toJSON() {
  /* 
    Property must be optional to be able to delete it
    In this case, we don't want password to be optional
    So we cast object as partial of UseBackendModel
  */
  const obj = this.toObject() as Partial<UserBackendModel>;
  delete obj.password;
  return obj;
});
export default mongoose.model("User", UserSchema);
