import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { resolveError } from ".";
import { AxiosResponse } from "axios";
import { AdminResponse, JobData, JobStatistics, UserData } from "../types";
import { FAILED_TO_LOAD_USER } from "../const";
import { createRestClient } from "../service";
import { jobService as JobService } from "../service";

export const dashboardLoader = async (): Promise<
  AxiosResponse<UserData> | unknown
> => {
  try {
    const { data }: AxiosResponse = await createRestClient().get<UserData>(
      "/users/current-user"
    );

    if (!data) {
      throw new Error(FAILED_TO_LOAD_USER);
    }
    return data;
  } catch (error) {
    toast.error(FAILED_TO_LOAD_USER);
    return redirect("/login");
  }
};

export const allJobsLoader = async (): Promise<JobData[] | unknown> => {
  try {
    const { data } = await createRestClient().get<JobData[]>("/jobs");
    if (!data) {
      throw new Error(FAILED_TO_LOAD_USER);
    }
    return data;
  } catch (error) {
    return resolveError(error);
  }
};

export const singleJobLoader = async ({
  params,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  try {
    const { data } = await createRestClient().get<JobData>(
      `/jobs/${params.id}`
    );
    return data;
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return resolveError(err, "/dashboard/all-jobs");
  }
};

export const adminLoader = async () => {
  try {
    const { data } = await createRestClient().get<AdminResponse>(
      `users/admin/app-stats`
    );
    return data;
  } catch (err) {
    return resolveError(err, "/dashboard");
  }
};

export const statsLoader = async () => {
  const jobService = JobService();
  try {
    const data: JobStatistics = await jobService.getJobStats();
    return data;
  } catch (err) {
    return resolveError(err, "/dashboard");
  }
};
