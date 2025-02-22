import React from "react";
import ShopBanner from "../modules/shop/ShopBanner";
import ShopDisplay from "../modules/shop/ShopDisplay";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import ShopFilter from "../modules/shop/ShopFilter";
import { useSelector } from "react-redux";
import MainBreadcrumbs from "../components/breadcrumb/MainBreadcrumb";

const ShopPage = () => {
  return (
    <div>
      <ShopBanner title="shop" subtitle="cửa hàng"></ShopBanner>
      <MainBreadcrumbs></MainBreadcrumbs>
      <div className="pt-10 border-t border-gray border-opacity-10">
        <div className="container">
          <div className="grid grid-cols-[270px_minmax(0,_1fr)] gap-8 mb-20">
            <ShopFilter></ShopFilter>
            <ShopDisplay></ShopDisplay>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
