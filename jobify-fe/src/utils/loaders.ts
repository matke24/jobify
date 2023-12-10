import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { resolveError, serviceFactory } from ".";
import { AxiosResponse } from "axios";
import { JobData, UserData } from "../types";
import { FAILED_TO_LOAD_USER } from "../const";

export const dashboardLoader = async (): Promise<
  AxiosResponse<UserData> | unknown
> => {
  try {
    const { data }: AxiosResponse = await serviceFactory().get<UserData>(
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
    const { data } = await serviceFactory().get<JobData[]>("/jobs");
    if (!data) {
      throw new Error(FAILED_TO_LOAD_USER);
    }
    return data;
  } catch (error) {
    resolveError(error);
  }
};

export const singleJobLoader = async ({
  params,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any): Promise<JobData | undefined> => {
  try {
    const { data } = await serviceFactory().get<JobData>(`/jobs/${params.id}`);
    return data;
  } catch (err) {
    resolveError(err, "/dashboard/all-jobs");
  }
};
