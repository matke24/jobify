import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { JobData } from "../types";
import { Form, Link } from "react-router-dom";

day.extend(advancedFormat);

const Job: React.FC<JobData> = ({
  _id,
  position,
  company,
  jobLocation,
  createdAt,
  jobStatus,
  jobType,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
          <footer className="actions">
            <Link className="btn edit-btn" to={`../edit-job/${_id}`}>
              Edit
            </Link>
            <Form>
              <button type="submit" className="btn delete-btn">
                Delete
              </button>
            </Form>
          </footer>
        </div>
      </div>
    </Wrapper>
  );
};

export default Job;
