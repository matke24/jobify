import { ActionFunction, ActionFunctionArgs, redirect } from "react-router-dom";
import { serviceFactory } from "./";

export const formAction: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData: FormData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await serviceFactory().post("/auth/register", data);
    return redirect("/login");
  } catch (error) {
    return error;
  }
};
