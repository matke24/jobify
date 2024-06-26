import { Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";
import SubmitButton from "../components/SubmitButton";
import { useDashboardContext } from "./DashboardLayout";

const Profile = () => {
  const { user } = useDashboardContext();

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow
            type="text"
            name="fname"
            id="fname"
            defaultValue={user.fname}
            label="First Name"
          />
          <FormRow
            type="text"
            name="lname"
            id="lname"
            defaultValue={user.lname}
            label="Last Name"
          />
          <FormRow
            type="text"
            label="Email"
            name="email"
            defaultValue={user.email}
            id="email"
          />
          <FormRow
            type="text"
            label="Location"
            name="location"
            defaultValue={user.location}
            id="location"
          />
          <SubmitButton formButton />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
