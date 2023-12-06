import { ActionFunctionArgs, redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { isRegisterForm, serviceFactory } from "./";
import { MIN_PASSWORD_LENGTH, PASSWORD_TOO_SHORT } from "../const";
import { AxiosError } from "axios";

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
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
      return error;
    }
  };
