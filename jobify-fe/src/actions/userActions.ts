import { ActionFunctionArgs } from "react-router-dom";
import { toast } from "react-toastify";
import { createAuthForm } from ".";
import { UPLOAD_IMAGE_SIZE_LIMIT } from "../const";
import { serviceFactory } from "../service";
import { resolveError } from "../utils";

export const formActionLogin = createAuthForm("/auth/login", "/dashboard");
export const formActionRegister = createAuthForm("/auth/register", "/login");

export const updateUserAction = async ({ request }: ActionFunctionArgs) => {
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

  try {
    await serviceFactory().patch("/users/update-user", formData);
    toast.success("User updated successfully");
  } catch (e) {
    return resolveError(e);
  }

  return null;
};
