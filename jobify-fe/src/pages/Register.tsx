import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import { Link } from "react-router-dom";
import { FORM_ROWS } from "./constants";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        {FORM_ROWS.map((row, key) => {
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
      </form>
    </Wrapper>
  );
};

export default Register;
