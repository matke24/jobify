import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { JobData } from "../types";
import { Form, Link } from "react-router-dom";
import { JustifyContent } from "../assets/wrappers/enum";

day.extend(advancedFormat);

const Job: React.FC<JobData> = ({
  _id,
  position,
  company,
  jobLocation,
  createdAt,
  jobStatus,
  jobType,
  authorName,
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
          <JobInfo
            justify={JustifyContent.FLEX_END}
            icon={<FaCalendarAlt />}
            text={date}
          />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus} content-child`}>{jobStatus}</div>
        </div>
      </div>
      <footer className="actions content footer">
        <div className="footer-btn-container">
          <Link className="btn edit-btn" to={`../edit-job/${_id}`}>
            Edit
          </Link>
          <Form method="post" action={`../delete-job/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </div>
        <div>
          <span className="author">~{authorName}</span>
        </div>
      </footer>
    </Wrapper>
  );
};

export default Job;
