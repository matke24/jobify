import { ReactElement } from "react";
import Wrapper from "../assets/wrappers/JobInfo";
interface Props {
  icon: ReactElement;
  text: string;
  className?: string;
}
const JobInfo: React.FC<Props> = (props) => {
  return (
    <Wrapper className={props.className}>
      <span className="job-icon">{props.icon}</span>
      <span className="job-text">{props.text}</span>
    </Wrapper>
  );
};

export default JobInfo;
