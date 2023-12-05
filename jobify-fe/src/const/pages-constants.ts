import { DashboardContextProps, FormRowProps } from "../types";

export const FORM_ROWS_REGISTER: FormRowProps[] = [
  {
    name: "fname",
    type: "text",
    id: "fname",
    label: "First Name",
    placeholder: "Enter your first name...",
    required: true,
  },
  {
    name: "lname",
    type: "text",
    id: "lname",
    label: "Last Name",
    placeholder: "Enter your last name...",
    required: true,
  },
  {
    name: "location",
    type: "text",
    id: "location",
    label: "Location",
    required: true,
  },
  {
    name: "email",
    type: "text",
    id: "email",
    label: "Email",
    placeholder: "Enter your email...",
    required: true,
  },
  {
    name: "password",
    type: "password",
    id: "password",
    label: "Password",
    placeholder: "Enter your password...",
    required: true,
  },
  // {
  //   name: "phone",
  //   type: "text",
  //   id: "phone",
  //   label: "Phone",
  //   placeholder: "Enter your phone...",
  // },
];

export const FORM_ROW_LOGIN = [
  {
    name: "email",
    type: "text",
    id: "email",
    label: "Email",
    placeholder: "Enter your email...",
    required: true,
  },
  {
    name: "password",
    type: "password",
    id: "password",
    label: "Password",
    placeholder: "Enter your password...",
    required: true,
  },
];

export const DEFAULT_DASHBOARD_CONTEXT: DashboardContextProps = {
  user: {
    name: "Default User",
  },
  showSideBar: false,
  isDarkTheme: false,
  toggleDarkTheme: () => {},
  toggleSidebar: () => {},
  logoutUser: () => {},
};
