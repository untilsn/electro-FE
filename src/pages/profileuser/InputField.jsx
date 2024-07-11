import React from "react";
import { Typography, Input, Button } from "@material-tailwind/react";

const InputField = ({ label, values, onChange }) => {
  return (
    <div className="flex items-end gap-5">
      <Typography className="font-bold capitalize">{label}</Typography>
      <Input
        className="text-xl"
        variant="standard"
        placeholder="Standard"
        value={values}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
