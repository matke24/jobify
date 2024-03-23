import React from "react";

import { ChartsContainer, StatsContainer } from "../components";
import { JobStatistics } from "../types";
import { defaultStatsContext } from "../const";
import { useQuery } from "@tanstack/react-query";
import { statsQuery } from "../query-service";

const StatsContext = React.createContext<JobStatistics>(defaultStatsContext);
const Stats: React.FC = () => {
  const { data: stats } = useQuery(statsQuery);

  if (!stats) {
    return <h2>Loading...</h2>;
  }

  return (
    <StatsContext.Provider value={stats}>
      <StatsContainer />
      {stats.monthlyStats?.length !== 0 && <ChartsContainer />}
    </StatsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStatsContext = () => React.useContext(StatsContext);
export default Stats;
