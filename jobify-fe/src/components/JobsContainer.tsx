import { useAllJobContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/JobsContainer";
import { JobData, Jobs } from "../types";
import Job from "./Job";

const JobsContainer: React.FC = () => {
  const { jobs } = useAllJobContext() as Jobs;

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
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
