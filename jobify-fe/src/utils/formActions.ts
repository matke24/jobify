import { ActionFunctionArgs, redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { isRegisterForm, resolveError, serviceFactory } from "./";
import {
  MIN_PASSWORD_LENGTH,
  PASSWORD_TOO_SHORT,
  UPLOAD_IMAGE_SIZE_LIMIT,
} from "../const";

export const createAuthForm =
  (path: string, relocate: string) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData: FormData = await request.formData();
    const data = Object.fromEntries(formData);

    if ((data.password as string).length < MIN_PASSWORD_LENGTH) {
      toast.error(PASSWORD_TOO_SHORT);
      return null;
    }

    try {
      await serviceFactory().post(path, data);
      toast.success(isRegisterForm(path));
      return redirect(relocate);
    } catch (error: unknown) {
      return resolveError(error);
    }
  };

export const formActionLogin = createAuthForm("/auth/login", "/dashboard");
export const formActionRegister = createAuthForm("/auth/register", "/login");

export const addJobAction = async ({ request }: ActionFunctionArgs) => {
  const formData: FormData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await serviceFactory().post("/jobs", data);
    toast.success("Job created");
    return redirect("/dashboard/all-jobs");
  } catch (err) {
    return resolveError(err);
  }
};

export const editJobAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData: FormData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await serviceFactory().patch(`/jobs/${params.id}`, data);
    toast.success("Job created");
    return redirect("/dashboard/all-jobs");
  } catch (err) {
    return resolveError(err);
  }
};

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
