import { redirect } from "react-router-dom";
import { AxiosError } from "axios";
import { REGISTRATION_SUCCESSFUL, LOGIN_SUCCESS } from "../const";
import { toast } from "react-toastify";

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
  return redirect(relocate as string) || error;
};
