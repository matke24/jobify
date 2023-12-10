import { redirect } from "react-router-dom";
import { AxiosError } from "axios";
import { REGISTRATION_SUCCESSFUL, LOGIN_SUCCESS } from "../const";
import { toast } from "react-toastify";
import { JobStatus, JobType } from "../enum";

export function resolveThemeState(themeState: boolean): string {
  return themeState ? "true" : "false";
}

export function checkDefaultTheme(): boolean {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
}

export const isRegisterForm = (path: string) => {
  return path.includes("register") ? REGISTRATION_SUCCESSFUL : LOGIN_SUCCESS;
};

export const resolveError = (error: unknown, relocate?: string) => {
  if (error instanceof AxiosError) toast.error(error?.response?.data?.message);
  if (relocate) return redirect(relocate as string) as unknown;
  return error;
};

export const resolveJobStatusDefaultValue = (value: string) => {
  switch (value) {
    case JobStatus.DECLINED:
      return JobStatus.DECLINED;
    case JobStatus.HIRED:
      return JobStatus.HIRED;
    case JobStatus.INTERVIEW:
      return JobStatus.INTERVIEW;
    case JobStatus.PENDING:
      return JobStatus.PENDING;
  }
};

export const resolveJobTypeDefaultValue = (value: string) => {
  switch (value) {
    case JobType.FULL_TIME:
      return JobType.FULL_TIME;
    case JobType.HYBRID:
      return JobType.HYBRID;
    case JobType.INTERNSHIP:
      return JobType.INTERNSHIP;
    case JobType.PART_TIME:
      return JobType.PART_TIME;
    case JobType.REMOTE:
      return JobType.REMOTE;
  }
};
