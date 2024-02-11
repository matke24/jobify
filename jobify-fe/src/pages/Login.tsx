import { Form, Link, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import { FORM_ROW_LOGIN } from "../const";
import SubmitButton from "../components/SubmitButton";
import { toast } from "react-toastify";
import { createRestClient } from "../service";

const Login = () => {
  const navigate = useNavigate();

  const loginDemo = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };

    try {
      await createRestClient().post("/auth/login", data); // auth service
      toast.success("Test application");
      navigate("/dashboard");
    } catch (e) {
      toast.error(e as string);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        {FORM_ROW_LOGIN.map((row) => {
          return <FormRow {...row} key={row.id} />;
        })}
        <SubmitButton />
        <button type="button" className="btn btn-block" onClick={loginDemo}>
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
