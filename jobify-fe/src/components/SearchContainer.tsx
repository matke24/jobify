import { Form, Link } from "react-router-dom";
// import { JobsWithPagination } from "../types";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from ".";
import FormRowSelect from "./FormRowSelect";
import { JobSort, JobStatus, JobType } from "../enum";
import SubmitButton from "./SubmitButton";

const SearchContainer = () => {
  // const data = useLoaderData() as JobsWithPagination;

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search Form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
          />
          <FormRowSelect
            label="Job Type"
            name="jobType"
            list={["all", ...Object.values(JobType)]}
          />
          <FormRowSelect
            label="Job Status"
            name="jobStatus"
            list={["all", ...Object.values(JobStatus)]}
          />
          <FormRowSelect
            label="Sort"
            name="sort"
            list={Object.values(JobSort)}
            defaultValue={JobSort.ASCENDING}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Clear
          </Link>
          <SubmitButton formButton />
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
