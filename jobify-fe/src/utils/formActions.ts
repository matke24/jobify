import { ActionFunction, ActionFunctionArgs, redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { serviceFactory } from "./";
import { REGISTRATION_SUCCESSFUL } from "../const";
import { AxiosError } from "axios";

export const formAction: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData: FormData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await serviceFactory().post("/auth/register", data);
    toast.success(REGISTRATION_SUCCESSFUL);
    return redirect("/login");
  } catch (error: unknown) {
    if (error instanceof AxiosError)
      toast.error(error?.response?.data?.message);

    return null;
  }
};
