import React from "react";

const InputForm = ({htmlFor,labelText,inputType,fieldName,value,onChange}) => {
  return (
    <>
      <div className="mb-1">
        <label htmlFor={htmlFor} className="form-label">
          {labelText}
        </label>
        <input
          type={inputType}
          className="form-control"
          name= {fieldName}
          value = {value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputForm;
