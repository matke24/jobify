import React from "react";
import {
  FaAddressBook,
  FaSuitcaseRolling,
  FaCalendarCheck,
  FaBug,
} from "react-icons/fa";
import StatItem from "./StatItem";
import Wrapper from "../assets/wrappers/StatsContainer";
import { useStatsContext } from "../pages/Stats";

const StatsContainer: React.FC = () => {
  const statsContext = useStatsContext();

  const { pending, interview, hired, declined } = statsContext.stats;
  return (
    <Wrapper>
      <StatItem
        title="Pending Applications"
        color="#e9b949"
        count={pending}
        bcg="#fcefc7"
        icon={<FaAddressBook />}
      />
      <StatItem
        title="Interviews Scheduled"
        count={interview}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="Positions Hired"
        count={hired}
        color="#128a52"
        bcg="#74dbad"
        icon={<FaCalendarCheck />}
      />
      <StatItem
        title="Jobs Declined"
        count={declined}
        color="#d66a6a"
        bcg="#ffeeee"
        icon={<FaBug />}
      />
    </Wrapper>
  );
};

export default StatsContainer;
