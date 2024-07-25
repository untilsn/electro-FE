import React from "react";
import TitlePath from "../../components/title/TitlePath";
import { useSelector } from "react-redux";
import CardShop from "../../components/card/CardShop";

const ShopRelative = ({ item }) => {
  return (
    <div>
      <TitlePath classname="mt-20 text-3xl font-normal text-center">
        You May Also Like
      </TitlePath>
      <div className="grid grid-cols-4 gap-10 my-20">
        {/* {products?.slice(0, 4).map((item) => (
          <CardShop item={item} key={item.id}></CardShop>
        ))} */}
      </div>
    </div>
  );
};

export default ShopRelative;
