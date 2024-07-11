import React from "react";
import ShopBanner from "../modules/shop/ShopBanner";
import ShopDisplay from "../modules/shop/ShopDisplay";
import ShopCategory from "../modules/shop/ShopCategory";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";

const ShopPage = () => {
  const location = useLocation();
  const urlParts = location.pathname.split("/");
  const shopName = urlParts[urlParts.length - 1];

  return (
    <div>
      <ShopBanner></ShopBanner>
      <Breadcrumb children={shopName}></Breadcrumb>
      <div className="pt-10 border-t border-gray border-opacity-10">
        <div className="container">
          <div className="grid grid-cols-[270px_minmax(0,_1fr)] gap-8 mb-20">
            <ShopCategory></ShopCategory>
            <ShopDisplay></ShopDisplay>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
