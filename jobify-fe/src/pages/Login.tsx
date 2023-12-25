import { Form, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import { FORM_ROW_LOGIN } from "../const";
import SubmitButton from "../components/SubmitButton";

const Login = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        {FORM_ROW_LOGIN.map((row) => {
          return <FormRow {...row} key={row.id} />;
        })}
        <SubmitButton />
        <button type="button" className="btn btn-block">
          Explore The App
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
