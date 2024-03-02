/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";
import { toast } from "react-toastify";

import { resolveError } from ".";
import { AdminResponse, JobData, JobStatistics, UserData } from "../types";
import { FAILED_TO_LOAD_USER } from "../const";
import { createRestClient, jobService as JobService } from "../service";
import { userService as UserService } from "../service/userService";

const jobService = JobService();
const userService = UserService();

export const dashboardLoader = async (): Promise<UserData | unknown> => {
  try {
    const data = await userService.getCurrentUser();

    if (!data) {
      throw new Error(FAILED_TO_LOAD_USER);
    }
    return data;
  } catch (error) {
    toast.error(FAILED_TO_LOAD_USER);
    return redirect("/login");
  }
};

export const allJobsLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<JobData[] | unknown> => {
  const reqParams = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { jobs, pagination } = await jobService.getAllJobs(reqParams);
    if (!jobs) {
      throw new Error(FAILED_TO_LOAD_USER);
    }
    return {
      jobs,
      pagination,
      searchValue: {
        ...reqParams,
      },
    };
  } catch (error) {
    return resolveError(error);
  }
};

export const singleJobLoader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const data = await jobService.getSingleJob(params.id as string);
    return data;
  } catch (err) {
    return resolveError(err, "/dashboard/all-jobs");
  }
};

export const adminLoader = async () => {
  try {
    const { data } = await createRestClient().get<AdminResponse>(
      `users/admin/app-stats`
    ); // user service
    return data;
  } catch (err) {
    return resolveError(err, "/dashboard");
  }
};

export const statsLoader = async () => {
  try {
    const data: JobStatistics = await jobService.getJobStats();
    return data;
  } catch (err) {
    return resolveError(err, "/dashboard");
  }
};
