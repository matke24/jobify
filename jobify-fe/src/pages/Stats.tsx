import React from "react";

import { ChartsContainer, StatsContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import { JobStatistics } from "../types";
import { defaultStatsContext } from "../const";

const StatsContext = React.createContext<JobStatistics>(defaultStatsContext);
const Stats: React.FC = () => {
  const stats = useLoaderData() as JobStatistics;

  if (stats.stats === undefined || stats.monthlyStats === undefined) {
    return <h2>Loading...</h2>;
  }

  return (
    <StatsContext.Provider value={stats}>
      <StatsContainer />
      {stats.monthlyStats?.length > 1 && <ChartsContainer />}
    </StatsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStatsContext = () => React.useContext(StatsContext);
export default Stats;
