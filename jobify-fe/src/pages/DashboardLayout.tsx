import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { SmallSidebar, BigSidebar, Nav, Loading } from "../components";
import { createContext, useContext, useState } from "react";
import { DashboardContextProps, ErrorMessage, UserLoader } from "../types";
import { DEFAULT_DASHBOARD_CONTEXT } from "../const";
import { checkDefaultTheme, resolveThemeState } from "../utils";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { createRestClient } from "../service";
import { userQuery } from "../query-service";
import { QueryClient, useQuery } from "@tanstack/react-query";

const DashboardContext = createContext<DashboardContextProps>(
  DEFAULT_DASHBOARD_CONTEXT
);

const DashboardLayout: React.FC<{ queryClient: QueryClient }> = ({
  queryClient,
}) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const user = useQuery(userQuery).data as UserLoader | undefined;

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

  if (!user) {
    return null;
  }

  const logoutUser = async () => {
    // In this case it is LogoutMessage
    const logout: AxiosResponse<ErrorMessage> = await createRestClient().get(
      "/auth/logout"
    ); // auth service
    queryClient.invalidateQueries();
    navigate("/login");
    toast.success(logout.data.message);
  };

  return (
    <DashboardContext.Provider
      value={{
        user: user.user,
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
              {isLoading ? <Loading /> : <Outlet context={user.user} />}
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
