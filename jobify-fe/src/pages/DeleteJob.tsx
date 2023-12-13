import { ActionFunctionArgs, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { serviceFactory, resolveError } from "../utils";

export const deleteJobAction = async ({ params }: ActionFunctionArgs) => {
  try {
    await serviceFactory().delete(`/jobs/${params.id}`);
    toast.success("Job deleted");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    return resolveError(error);
  }
};
