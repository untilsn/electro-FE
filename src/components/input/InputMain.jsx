import { Input } from "@material-tailwind/react";
import React from "react";

const InputMain = ({ label = "Username" }) => {
  return (
    <div>
      <Input label={label} />
    </div>
  );
};

export default InputMain;
