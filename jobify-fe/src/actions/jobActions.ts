import { ActionFunctionArgs, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { serviceFactory } from "../service";
import { resolveError } from "../utils";

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
