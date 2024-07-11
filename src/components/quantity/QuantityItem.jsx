import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const QuantityItem = ({ classname, onQuantityChange }) => {
  const [quantityItem, setQuantityItem] = useState(1);
  const handleIncrement = () => {
    const newQuantity = quantityItem + 1;
    setQuantityItem(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleDecrement = () => {
    if (quantityItem > 0) {
      const newQuantity = quantityItem - 1;
      setQuantityItem(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <span
      className={`flex select-none items-center justify-between px-2  py-3 border border-gray w-[200px] border-opacity-30 ${classname}`}
    >
      <span onClick={handleDecrement}>
        <span>
          <FiMinus />
        </span>
      </span>
      <span>{quantityItem}</span>
      <span onClick={handleIncrement}>
        <span>
          <FiPlus />
        </span>
      </span>
    </span>
  );
};

export default QuantityItem;
