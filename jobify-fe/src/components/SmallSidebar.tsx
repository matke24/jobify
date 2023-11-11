import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";

const SmallSidebar = () => {
  const context = useDashboardContext();
  console.log(context);
  return <Wrapper>SmallSidebar</Wrapper>;
};

export default SmallSidebar;
