import { ActionFunctionArgs, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { resolveError } from "../utils";
import { jobService as JobService } from "../service/jobService";
import { FormEntryData } from "../types";

const jobService = JobService();

export const addJobAction = async ({ request }: ActionFunctionArgs) => {
  const formData: FormData = await request.formData();
  const data: FormEntryData = Object.fromEntries(formData);

  try {
    await jobService.createJob(data);
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
  const data: FormEntryData = Object.fromEntries(formData);

  if (params.id === undefined) {
    return redirect("/dashboard/all-jobs");
  }

  try {
    await jobService.editJob(params.id, data);
    toast.success("Job updated");
    return redirect("/dashboard/all-jobs");
  } catch (err) {
    return resolveError(err);
  }
};
