import { useAllJobContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/JobsContainer";
import { JobData, JobsWithPagination } from "../types";
import Job from "./Job";
import { JobPagination } from ".";
import { useNavigate } from "react-router-dom";

const JobsContainer: React.FC = () => {
  const navigation = useNavigate();
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
      <div className="form-header">
        <h5>Total: {pagination.totalJobs}</h5>
        <button
          className="btn form-btn header-btn"
          onClick={() => {
            navigation("/dashboard");
          }}
        >
          Create job
        </button>
      </div>
      <div className="jobs">
        {jobs.map((job: JobData) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      <JobPagination />
    </Wrapper>
  );
};

export default JobsContainer;
