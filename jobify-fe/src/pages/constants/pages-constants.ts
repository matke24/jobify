import { FormRowProps } from "../../components/props";

export const FORM_ROWS: FormRowProps[] = [
  {
    name: "First Name",
    type: "text",
    id: "fname",
    label: "First Name",
    placeholder: "Enter your first name...",
    required: true,
  },
  {
    name: "Last Name",
    type: "text",
    id: "lname",
    label: "Last Name",
    placeholder: "Enter your last name...",
    required: true,
  },
  {
    name: "Email",
    type: "text",
    id: "email",
    label: "Email",
    placeholder: "Enter your email...",
    required: true,
  },
  {
    name: "Password",
    type: "password",
    id: "password",
    label: "Password",
    placeholder: "Enter your password...",
    required: true,
  },
  {
    name: "Phone",
    type: "text",
    id: "phone",
    label: "Phone",
    placeholder: "Enter your phone...",
  },
];
