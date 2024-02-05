import {
  FaSuitcaseRolling,
  FaCalendarCheck,
  FaBug,
  FaAddressBook,
} from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "../components/StatItem";

const Stats = () => {
  return (
    <Wrapper>
      <StatItem
        title="Pending"
        color="#e9b949"
        count={1}
        bcg="#fcefc7"
        icon={<FaAddressBook />}
      />
      <StatItem
        title="Interview"
        count={1}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="Hired"
        count={1}
        color="#128a52"
        bcg="#74dbad"
        icon={<FaCalendarCheck />}
      />
      <StatItem
        title="Declined"
        count={1}
        color="#d66a6a"
        bcg="#ffeeee"
        icon={<FaBug />}
      />
    </Wrapper>
  );
};

export default Stats;
