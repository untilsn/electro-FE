import React from "react";
import { Select, Option } from "@material-tailwind/react";

const Dropdown = () => {
  return (
    <div className="w-72">
      <Select label="Select Version">
        <Option value="html">Material Tailwind HTML</Option>
        <Option value="react">Material Tailwind React</Option>
        <Option value="vue">Material Tailwind Vue</Option>
        <Option value="angular">Material Tailwind Angular</Option>
        <Option value="svelte">Material Tailwind Svelte</Option>
      </Select>
    </div>
  );
};

export default Dropdown;
