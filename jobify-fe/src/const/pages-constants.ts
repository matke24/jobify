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
    placeholder: "Enter your location...",
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
    _id: "",
    _v: 0,
    fname: "",
    lname: "",
    location: "",
    email: "",
    role: "",
  },
  showSideBar: false,
  isDarkTheme: false,
  toggleDarkTheme: () => {},
  toggleSidebar: () => {},
  logoutUser: () => {},
};
