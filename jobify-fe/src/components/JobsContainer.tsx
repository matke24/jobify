import { useAllJobContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/JobsContainer";
import { JobData, JobsWithPagination } from "../types";
import Job from "./Job";
import { JobPagination } from ".";

const JobsContainer: React.FC = () => {
  const { jobs, pagination } = useAllJobContext() as JobsWithPagination;

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs found</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>Total: {pagination.totalJobs}</h5>
      <div className="jobs">
        {jobs.map((job: JobData) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {pagination.totalPages > 1 && <JobPagination />}
    </Wrapper>
  );
};

export default JobsContainer;
