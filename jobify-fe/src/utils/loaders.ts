import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { serviceFactory } from ".";
import { AxiosResponse } from "axios";
import { UserData } from "../types";
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
  } catch {
    toast.error(FAILED_TO_LOAD_USER);
    return redirect("/login");
  }
};
