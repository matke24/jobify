import { Form, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import { FORM_ROWS_REGISTER } from "../const";

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        {FORM_ROWS_REGISTER.map((row, key) => {
          return <FormRow key={key} {...row} />;
        })}
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          Already have an account?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
