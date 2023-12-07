import { createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { JobLoader } from "../types";
import SearchContainer from "../components/SearchContainer";
import JobsContainer from "../components/JobsContainer";

const AllJobsContext = createContext({});
const AllJobs = () => {
  const { data } = useLoaderData() as JobLoader;
  console.log(data);
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
