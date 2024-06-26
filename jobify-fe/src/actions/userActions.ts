import { ActionFunctionArgs } from "react-router-dom";
import { toast } from "react-toastify";
import { createAuthForm } from ".";
import { UPLOAD_IMAGE_SIZE_LIMIT } from "../const";

import { userService as UserService } from "../service/userService";

export const formActionLogin = createAuthForm("/auth/login", "/dashboard");
export const formActionRegister = createAuthForm("/auth/register", "/login");

export const updateUserAction = async ({ request }: ActionFunctionArgs) => {
  const userService = UserService();
  const formData = await request.formData();
  const file = formData.get("avatar");

  if (!(file instanceof File)) {
    toast.error("An error occurred");
    return null;
  }

  if (file && file?.size > UPLOAD_IMAGE_SIZE_LIMIT) {
    toast.error("File size too big");
    return null;
  }

  await userService.updateUser(formData);
  toast.success("User updated successfully");

  return null;
};
