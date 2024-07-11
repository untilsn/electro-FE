import React from "react";
import TitlePath from "../../components/title/TitlePath";

const ShopNavigation = () => {
  return (
    <div className="flex items-center justify-center gap-10 text-3xl font-semibold capitalize text-dark">
      <TitlePath>featured</TitlePath>
      <TitlePath>on sales</TitlePath>
      <TitlePath>top sale</TitlePath>
    </div>
  );
};

export default ShopNavigation;
