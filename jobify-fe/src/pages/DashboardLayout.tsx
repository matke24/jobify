import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { SmallSidebar, BigSidebar, Nav } from "../components";
import { createContext, useContext, useState } from "react";
import { DashboardContextProps } from "../utils/props";
import { DEFAULT_DASHBOARD_CONTEXT } from "../utils/constants";
import { checkDefaultTheme, resolveThemeState } from "../utils";

const DashboardContext = createContext<DashboardContextProps>(
  DEFAULT_DASHBOARD_CONTEXT
);

const DashboardLayout = () => {
  const user = {
    name: "Aleksa",
  };

  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", resolveThemeState(newDarkTheme));
  };

  const toggleSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  const logoutUser = async () => {
    console.log("logout");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSideBar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Nav />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = () => {
  return useContext<DashboardContextProps>(DashboardContext);
};

export default DashboardLayout;
