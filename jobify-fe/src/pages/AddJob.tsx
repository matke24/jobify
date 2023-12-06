import { Form, useNavigation, useOutletContext } from "react-router-dom";
import { JobStatus, JobType, UseNavigationEnum } from "../enum";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";
import { UserLoader } from "../types";
import FormRowSelect from "../components/FormRowSelect";

const AddJob = () => {
  const { user } = useOutletContext() as UserLoader;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === UseNavigationEnum.SUBMITTING;

  return (
    <Wrapper>
      <Form method="post">
        <h4 style={{ marginBottom: "30px" }}>add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" id="position" />
          <FormRow type="text" name="company" id="company" />
          <FormRow
            type="text"
            label="job location"
            name="jobLocation"
            id="jobLocation"
            defaultValue={user.location}
          />
          <FormRowSelect
            name="jobStatus"
            label="job location"
            list={Object.values(JobStatus)}
            defaultValue={JobStatus.PENDING}
          />
          <FormRowSelect
            name="jobType"
            label="job type"
            list={Object.values(JobType)}
            defaultValue={JobType.FULL_TIME}
          />
        </div>
        <button
          type="submit"
          className="btn btn-block form-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
