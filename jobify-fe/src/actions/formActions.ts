import { ActionFunctionArgs, redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { isRegisterForm, resolveError } from "../utils";
import { MIN_PASSWORD_LENGTH, PASSWORD_TOO_SHORT } from "../const";
import { createRestClient } from "../service";

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
      await createRestClient().post(path, data);
      toast.success(isRegisterForm(path));
      return redirect(relocate);
    } catch (error: unknown) {
      return resolveError(error);
    }
  };
