import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { serviceFactory } from ".";
import { AxiosError, AxiosResponse } from "axios";
import { Job, UserData } from "../types";
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

export const allJobsLoader = async (): Promise<
  AxiosResponse<Job[]> | unknown
> => {
  try {
    const { data }: AxiosResponse = await serviceFactory().get<Job[]>("/jobs");
    if (!data) {
      throw new Error(FAILED_TO_LOAD_USER);
    }
    return { data };
  } catch (error) {
    if (error instanceof AxiosError)
      toast.error(error?.response?.data?.message);
    return error;
  }
};
