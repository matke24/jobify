import { Form, useLoaderData } from "react-router-dom";

import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";
import FormRowSelect from "../components/FormRowSelect";
import { Job } from "../types";
import { JobStatus, JobType } from "../enum";
import SubmitButton from "../components/SubmitButton";

const EditJob: React.FC = () => {
  const { job } = useLoaderData() as Job;
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            id="position"
            defaultValue={job.position}
          />
          <FormRow
            type="text"
            name="company"
            id="company"
            defaultValue={job.company}
          />
          <FormRow
            type="text"
            label="job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
            id="jobLocation"
          />
          <FormRowSelect
            name={"jobStatus"}
            label="job status"
            list={Object.values(JobStatus)}
            defaultValue={job.jobStatus as JobStatus}
          />
          <FormRowSelect
            name={"jobType"}
            label="job type"
            list={Object.values(JobType)}
            defaultValue={job.jobType as JobType}
          />
          <SubmitButton formButton />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
