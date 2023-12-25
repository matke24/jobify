import React from "react";
import { useNavigation } from "react-router-dom";

interface Props {
  formButton?: boolean;
}

const SubmitButton: React.FC<Props> = ({ formButton }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      className={`btn btn-block ${formButton && "form-btn"}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? "submitting..." : "submit"}
    </button>
  );
};

export default SubmitButton;
