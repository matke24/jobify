import { createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { JobsLoader } from "../types";
import SearchContainer from "../components/SearchContainer";
import JobsContainer from "../components/JobsContainer";

const AllJobsContext = createContext({});
const AllJobs = () => {
  const { data } = useLoaderData() as JobsLoader;
  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAllJobContext = () => useContext(AllJobsContext);
export default AllJobs;
