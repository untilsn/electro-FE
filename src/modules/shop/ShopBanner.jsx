import React from "react";
import shopBanner from "/public/shopbanner.jpg";
const ShopBanner = ({ title = "list", subtitle = "shop" }) => {
  return (
    <div
      className="py-16"
      style={{
        backgroundImage: `url(${shopBanner})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="text-center capitalize">
        <h1 className="text-4xl">{title}</h1>
        <h2 className="mt-2 text-xl text-yellowColor">{subtitle}</h2>
      </div>
    </div>
  );
};

export default ShopBanner;
