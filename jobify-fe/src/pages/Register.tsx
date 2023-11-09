import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import { Link } from "react-router-dom";
import { FormRowProps } from "../components/props";

const Register = () => {
  const formRowProps: FormRowProps = {
    name: "Name",
    type: "text",
    id: "name",
    label: "Name",
    placeholder: "Enter your name...",
    required: true,
  };
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow {...formRowProps} />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          Already have an account?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
