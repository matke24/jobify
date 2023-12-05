import { Form, useNavigation, Link } from "react-router-dom";

import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import { FORM_ROWS_REGISTER } from "../const";
import { UseNavigationEnum } from "../enum";

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting: boolean =
    navigation.state === UseNavigationEnum.SUBMITTING;
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        {FORM_ROWS_REGISTER.map((row, key) => {
          return <FormRow key={key} {...row} />;
        })}
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
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
