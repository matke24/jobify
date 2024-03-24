import { Form } from "react-router-dom";

import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";
import FormRowSelect from "../components/FormRowSelect";
import { JobStatus, JobType } from "../enum";
import SubmitButton from "../components/SubmitButton";
import { useDashboardContext } from "./DashboardLayout";

const AddJob = () => {
  const { user } = useDashboardContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" id="position" />
          <FormRow type="text" name="company" id="company" />
          <FormRow
            type="text"
            label="job location"
            name="jobLocation"
            defaultValue={user.location}
            id="jobLocation"
          />
          <FormRowSelect
            name={"jobStatus"}
            label="job status"
            list={Object.values(JobStatus)}
            defaultValue={JobStatus.PENDING}
          />
          <FormRowSelect
            name={"jobType"}
            label="job type"
            list={Object.values(JobType)}
            defaultValue={JobType.FULL_TIME}
          />
          <SubmitButton formButton />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
