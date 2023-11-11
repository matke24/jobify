export interface User {
  name: string;
}

export interface DashboardContextProps {
  user: User;
  showSideBar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSideBar: () => void;
  logoutUser: () => void;
}
