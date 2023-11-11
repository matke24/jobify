import { NavLink } from "react-router-dom";
import SMALL_SIDEBAR_LINKS from "../utils/Links";
import { useDashboardContext } from "../pages/DashboardLayout";

const NavLinks = () => {
  const dashboardContext = useDashboardContext();
  if (!dashboardContext) {
    return;
  }

  const { toggleSidebar } = dashboardContext;
  return (
    <div className="nav-links">
      {SMALL_SIDEBAR_LINKS.map((link) => {
        const { text, icon, path } = link;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
