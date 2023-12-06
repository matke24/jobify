import { UserData } from ".";

export interface DashboardContextProps {
  user: UserData;
  showSideBar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => void;
}
