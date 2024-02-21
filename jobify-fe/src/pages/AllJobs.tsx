import { createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { JobsWithPagination } from "../types";
import SearchContainer from "../components/SearchContainer";
import JobsContainer from "../components/JobsContainer";

const AllJobsContext = createContext({});
const AllJobs = () => {
  const { pagination, jobs } = useLoaderData() as JobsWithPagination;
  return (
    <AllJobsContext.Provider value={{ pagination, jobs }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAllJobContext = () => useContext(AllJobsContext);
export default AllJobs;
