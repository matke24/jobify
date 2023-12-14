import { ReactElement } from "react";
import Wrapper from "../assets/wrappers/StatItem";

interface Props {
  color: string;
  bcg: string;
  count: number;
  icon: ReactElement;
  title: string;
}
const StatItem: React.FC<Props> = ({ bcg, color, count, icon, title }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

export default StatItem;
