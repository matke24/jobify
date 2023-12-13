import { useLoaderData } from "react-router-dom";
import { AdminResponse } from "../types";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "../components/StatItem";
import { FaSuitcaseRolling } from "react-icons/fa";

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
    </Wrapper>
  );
};

export default Admin;
