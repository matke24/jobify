import { Form, useLoaderData, useNavigation } from "react-router-dom";

import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";
import FormRowSelect from "../components/FormRowSelect";
import { Job } from "../types";
import { JobStatus, JobType } from "../enum";
import {
  resolveJobStatusDefaultValue,
  resolveJobTypeDefaultValue,
} from "../utils";

const EditJob: React.FC = () => {
  const { job } = useLoaderData() as Job;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
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
            defaultValue={resolveJobStatusDefaultValue(job.jobStatus)}
          />
          <FormRowSelect
            name={"jobType"}
            label="job type"
            list={Object.values(JobType)}
            defaultValue={resolveJobTypeDefaultValue(job.jobType)}
          />
          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
