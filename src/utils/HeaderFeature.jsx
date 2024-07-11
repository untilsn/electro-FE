import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeaderFeature = ({ children, icon, item }) => {
  const orderItem = useSelector((state) => state?.order);
  return (
    <Link
      to={`${item.url}`}
      className="flex flex-col items-center justify-center gap-2 ml-7 text-light"
    >
      <span className="relative hover:text-yellowColor">
        {icon}
        {children === "compare" ? null : children === "wishlist" ? (
          <div className="absolute top-0 flex items-center justify-center w-4 h-4 text-xs text-black rounded-full -right-2 bg-yellowColor">
            {orderItem?.orderItem?.length || 0}
          </div>
        ) : (
          <div className="absolute top-0 flex items-center justify-center w-4 h-4 text-xs text-black rounded-full -right-2 bg-yellowColor">
            {orderItem?.orderItems?.length || 0}
          </div>
        )}
      </span>
      <span className="text-xs text-textColor">{children}</span>
    </Link>
  );
};

export default HeaderFeature;
