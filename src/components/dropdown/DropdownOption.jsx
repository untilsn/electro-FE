import React from "react";
import { Controller } from "react-hook-form";
import { Select, Option } from "@material-tailwind/react";

const DropdownOption = ({ control, name, itemlist, label }) => {
  if (!itemlist) return null; 

  return (
    <Controller
      defaultValue={""}
      control={control}
      name={name}
      render={({ field }) => (
        <Select variant="standard" label={label} {...field}>
          {itemlist.map((item) => (
            <Option key={item._id} value={item.name}>
              {item.name}
            </Option>
          ))}
        </Select>
      )}
    />
  );
};

export default DropdownOption;
