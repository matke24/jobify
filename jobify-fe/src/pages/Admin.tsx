import { useLoaderData } from "react-router-dom";
import { AdminResponse } from "../types";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "../components/StatItem";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";

const Admin = () => {
  const { jobs, users } = useLoaderData() as AdminResponse;

  return (
    <Wrapper>
      <StatItem
        title="total users"
        color="#e9b949"
        count={users}
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;
