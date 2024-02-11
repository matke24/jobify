import { ActionFunctionArgs, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { resolveError } from "../utils";
import { jobService as JobService } from "../service/jobService";

export const deleteJobAction = async ({ params }: ActionFunctionArgs) => {
  const jobService = JobService();

  if (params.id === undefined) {
    return redirect("/dashboard/all-jobs");
  }

  try {
    await jobService.deleteJob(params.id);
    toast.success("Job deleted");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    return resolveError(error);
  }
};
