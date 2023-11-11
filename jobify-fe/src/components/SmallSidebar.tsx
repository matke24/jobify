import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { Logo } from ".";
import { useDashboardContext } from "../pages/DashboardLayout";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const dashboardContext = useDashboardContext();
  if (!dashboardContext) {
    return;
  }

  const { showSideBar, toggleSidebar } = dashboardContext;

  return (
    <Wrapper>
      <div
        className={
          showSideBar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
