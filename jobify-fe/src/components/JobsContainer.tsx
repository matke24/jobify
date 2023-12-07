import { useAllJobContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/JobsContainer";
import { JobData, JobsContext } from "../types";
import Job from "./Job";

const JobsContainer: React.FC = () => {
  const { data } = useAllJobContext() as JobsContext;
  const { jobs } = data;

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs found</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="jobs">
        {jobs.map((job: JobData) => {
          return <Job key={job._id} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
