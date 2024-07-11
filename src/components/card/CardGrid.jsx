import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { LiaBinocularsSolid, LiaHeart, LiaHeartSolid } from "react-icons/lia";
import { ReviewIcon } from "./CardItem";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useCheckFavorite } from "../../hooks/useCheckFavorite";

const CardGrid = ({ item }) => {
  const isFavorite = useCheckFavorite(item);

  return (
    <div className="grid items-center grid-cols-4 py-5 border-b border-gray border-opacity-20">
      {/* image */}
      <div className="max-w-[200px] max-h-[200px] w-full h-full col-span-1 shadow-md">
        <Link to={`/product?id=${item?._id}`}>
          <img
            src={item?.image[0]}
            className="object-contain w-full h-full "
            alt="img"
          />
        </Link>
      </div>
      {/* info */}
      <div className="flex flex-col col-span-2 gap-5 pr-2">
        <div>
          <span className="text-sm text-gray text-opacity-80">
            {item?.type}
          </span>

          <h1 className="text-base text-dark overflow-hidden overflow-ellipsis h-[22px]">
            {item?.name}
          </h1>
        </div>
        <div className="leading-6 text-sm text-gray overflow-hidden overflow-ellipsis h-[78px]">
          {parse(item?.desc)}
        </div>
      </div>
      {/* chuc nang */}
      <div className="flex flex-col col-span-1 gap-4 text-opacity-50 text-gray">
        <div className="text-[17px] text-yellowColor px-2">${item?.price}</div>
        <div className="flex items-center gap-4 px-2 ">
          <div className="flex items-center ">
            {Array(5)
              .fill(0)
              .map((item) => (
                <ReviewIcon key={v4()}></ReviewIcon>
              ))}
          </div>
          <div className="text-[13px]">({item?.reviews.length} reviews) </div>
        </div>
        <div className="flex items-center text-[13px] justify-around text-gray text-opacity-80">
          <span className="flex items-center justify-center gap-1 hover:text-yellowColor">
            <LiaBinocularsSolid />
            quick view
          </span>
          <span
            // onClick={() => handleAddItem(item, "wishlists")}
            className={`${""} flex items-center justify-center gap-1 hover:text-yellowColor`}
          >
            {isFavorite ? <LiaHeartSolid /> : <LiaHeart />}
            wishlist
          </span>
        </div>
        <div className="flex items-center justify-center gap-5 p-4 uppercase bg-white border border-gray border-opacity-20 text-yellowColor max-w-[250px] w-full  hover:bg-yellowColor hover:text-white">
          <span>
            <FaCartPlus />
          </span>
          <span>add to carts</span>
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
