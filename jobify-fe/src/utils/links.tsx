import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { SmallSidebarLinks } from "../enum";

const SMALL_SIDEBAR_LINKS = [
  {
    text: SmallSidebarLinks.ALL_JOBS,
    path: ".",
    icon: <MdQueryStats />,
  },
  {
    text: SmallSidebarLinks.ADD_JOB,
    path: "add-job",
    icon: <FaWpforms />,
  },
  {
    text: SmallSidebarLinks.STATS,
    path: "stats",
    icon: <IoBarChartSharp />,
  },
  {
    text: SmallSidebarLinks.PROFILE,
    path: "profile",
    icon: <ImProfile />,
  },
  {
    text: SmallSidebarLinks.ADMIN,
    path: "admin",
    icon: <MdAdminPanelSettings />,
  },
];

export default SMALL_SIDEBAR_LINKS;
