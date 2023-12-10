import { createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { Jobs } from "../types";
import SearchContainer from "../components/SearchContainer";
import JobsContainer from "../components/JobsContainer";

const AllJobsContext = createContext({});
const AllJobs = () => {
  const { jobs } = useLoaderData() as Jobs;
  return (
    <AllJobsContext.Provider value={{ jobs }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAllJobContext = () => useContext(AllJobsContext);
export default AllJobs;
