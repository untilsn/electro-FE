import React from "react";

const SupportServicesItem = ({
  title = "Free Shipping",
  info = "orders $50 or more",
  icon = "",
}) => {
  return (
    <div className="flex items-center justify-between gap-5 ">
      <div className="flex items-center gap-3">
        <span>{icon}</span>
        <div className="text-sm text-darkPrimary ">
          <h1 className="font-semibold">{title}</h1>
          <h2 className="text-sm text-gray text-opacity-60">{info}</h2>
        </div>
      </div>
    </div>
  );
};

export default SupportServicesItem;
