import React from "react";
import { Checkbox, Radio } from "@material-tailwind/react";

const CheckboxCart = ({ price = 0.00, labelItem, onChange = () => {} }) => {
  return (
    <div className="flex items-center justify-between">
      <Radio
        name="shipping"
        className=" checked:p-1 checked:bg-white"
        label={labelItem}
        color="gray"
        onChange={onChange}
        defaultChecked={labelItem === "Miễn phí vận chuyển:"}
      />
      <div className="text-sm font-semibold text-dark text-opacity-80">{price}đ</div>
    </div>
  );
};

export default CheckboxCart;
