import { Form, Link, SubmitFunction, useSubmit } from "react-router-dom";
import { FormRow } from ".";
import FormRowSelect from "./FormRowSelect";
import { JobSort, JobStatus, JobType } from "../enum";
import { DEBOUNCE_INTERVAL } from "../const";
import { useAllJobContext } from "../pages/AllJobs";
import Accordion from "./Accordion";

const SearchContainer = () => {
  const { searchValue } = useAllJobContext();
  const submitHandler: SubmitFunction = useSubmit();

  return (
    <Accordion>
      <Form
        className="form"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e: any) => {
          if (e.target.name === "search") {
            const currentTarget = e.currentTarget;
            setTimeout(() => {
              submitHandler(currentTarget);
            }, DEBOUNCE_INTERVAL);
            return;
          }
          submitHandler(e.currentTarget);
        }}
      >
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
            defaultValue={searchValue?.search || ""}
          />
          <FormRowSelect
            defaultValue={searchValue?.jobType || "all"}
            label="Job Type"
            name="jobType"
            list={["all", ...Object.values(JobType)]}
          />
          <FormRowSelect
            defaultValue={searchValue?.jobStatus || "all"}
            label="Job Status"
            name="jobStatus"
            list={["all", ...Object.values(JobStatus)]}
          />
          <FormRowSelect
            label="Sort"
            name="sort"
            list={Object.values(JobSort)}
            defaultValue={searchValue?.sort || JobSort.NEWEST_FIRST}
          />
          <Link to="/dashboard" className="btn form-btn delete-btn">
            Clear
          </Link>
        </div>
      </Form>
    </Accordion>
  );
};

export default SearchContainer;
