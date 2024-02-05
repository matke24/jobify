import { UserData } from ".";

export type FormEntryData = {
  [k: string]: FormDataEntryValue;
};

export interface DashboardContextProps {
  user: UserData;
  showSideBar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => void;
}

export interface ErrorMessage {
  message: string;
}
