import { FormRowProps } from "../utils/props";

const FormRow: React.FC<FormRowProps> = (props) => {
  const { id, type, name, placeholder, required, label }: FormRowProps = props;
  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">
        {label || name}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="form-input"
        placeholder={placeholder || ""}
        required={required || false}
      />
    </div>
  );
};

export default FormRow;
