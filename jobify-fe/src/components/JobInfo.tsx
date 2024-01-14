import { ReactElement } from "react";
import Wrapper from "../assets/wrappers/JobInfo";
import { JustifyContent, WidthType } from "../assets/wrappers/enum";
interface Props {
  icon: ReactElement;
  text: string;
  className?: string;
  justify?: JustifyContent;
  widthType?: WidthType;
}
const JobInfo: React.FC<Props> = ({ icon, text, className, justify }) => {
  const resolveJustify = () => {
    return justify === undefined ? JustifyContent.FLEX_START : justify;
  };

  return (
    <Wrapper className={`${className}`} justify={resolveJustify()}>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
