import React from "react";

const Label = ({ children, id }) => {
  return (
    <label className="capitalize" htmlFor={id}>
      {children}
    </label>
  );
};

export default Label;
