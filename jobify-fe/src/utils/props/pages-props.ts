export interface User {
  name: string;
}

export interface DashboardContextProps {
  user: User;
  showSideBar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => void;
}
