import { NavLink } from "react-router-dom";
import SMALL_SIDEBAR_LINKS from "../utils/links";
import { useDashboardContext } from "../pages/DashboardLayout";

interface Props {
  isBigSidebar: boolean;
}
const NavLinks = (props: Props) => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <div className="nav-links">
      {SMALL_SIDEBAR_LINKS.map((link) => {
        const { text, icon, path } = link;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={!props.isBigSidebar ? toggleSidebar : undefined}
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
