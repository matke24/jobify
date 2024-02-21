import React from "react";
import { FromRowSelectProps } from "../types";

const FormRowSelect: React.FC<FromRowSelectProps> = (props) => {
  const { name, label, list, defaultValue, className } = props;
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <select
        className={`form-select ${className}`}
        name={name}
        id={name}
        defaultValue={defaultValue}
      >
        {list.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
