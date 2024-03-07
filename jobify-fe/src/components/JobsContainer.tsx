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
<<<<<<< HEAD
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
=======
      <p
        style={{
          marginBottom: "30px",
          paddingRight: "20px",
          textAlign: "right",
        }}
      >
        Total results: {pagination.totalJobs}
      </p>
>>>>>>> parent of e30216e (Merge pull request #52 from matke24/add-pagination)
      <div className="jobs">
        {jobs.map((job: JobData) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
