import React from "react";
import TitlePath from "../../components/title/TitlePath";

const ShopNavigation = () => {
  return (
    <div className="flex items-center justify-center gap-10 text-3xl font-semibold capitalize text-dark">
      <TitlePath>sản phẩm mới</TitlePath>
      <TitlePath>ưu đãi</TitlePath>
      <TitlePath>bán chạy</TitlePath>
    </div>
  );
};

export default ShopNavigation;
