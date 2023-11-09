import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import notFound from "../assets/images/not-found.svg";

const Error: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();

  if (!error) {
    return;
  }

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={notFound} alt="not found" />
          <h3>Cannot find the page you are looking for</h3>
          <p>It seems the page does not exist</p>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
