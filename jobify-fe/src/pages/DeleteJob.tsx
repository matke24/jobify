import { ActionFunctionArgs, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { resolveError } from "../utils";
import { createRestClient } from "../service";

export const deleteJobAction = async ({ params }: ActionFunctionArgs) => {
  try {
    await createRestClient().delete(`/jobs/${params.id}`);
    toast.success("Job deleted");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    return resolveError(error);
  }
};
