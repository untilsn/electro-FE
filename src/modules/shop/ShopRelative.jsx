import React from "react";
import CardRelative from "../../components/card/CardRelative";
import TitlePath from "../../components/title/TitlePath";
import { useSelector } from "react-redux";

const ShopRelative = () => {
  const { products } = useSelector((state) => state.store);
  return (
    <div>
      <TitlePath classname="mt-20 text-3xl font-normal text-center">
        You May Also Like
      </TitlePath>
      <div className="grid grid-cols-4 gap-10 my-20">
        {products?.slice(0, 4).map((item) => (
          <CardRelative item={item} key={item.id}></CardRelative>
        ))}
      </div>
    </div>
  );
};

export default ShopRelative;
