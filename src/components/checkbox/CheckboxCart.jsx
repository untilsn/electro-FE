import React from "react";
import { Checkbox, Radio } from "@material-tailwind/react";

const CheckboxCart = ({ price = 0.0, labelItem, onChange = () => {} }) => {
  return (
    <div className="flex items-center justify-between">
      <Radio
        name="shipping"
        className=" checked:p-1 checked:bg-white"
        label={labelItem}
        color="gray"
        onChange={onChange}
        defaultChecked={labelItem === "Free Shipping"}
      />
      <div className="text-sm text-dark text-opacity-80">${price}</div>
    </div>
  );
};

export default CheckboxCart;
