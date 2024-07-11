import React, { useState } from "react";
import { ReviewIcon } from "./CardItem";
import { v4 } from "uuid";
import { PiBinocularsBold } from "react-icons/pi";
import { FaCartPlus } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useCheckFavorite } from "../../hooks/useCheckFavorite";
import { useDispatch } from "react-redux";

const CardShop = ({ item }) => {
  if (!item) return;
  const [isHovered, setIsHovered] = useState(false);
  const isFavorite = useCheckFavorite(item);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="z-0 transition-all shadow-sm hover:shadow-itemShadow group"
    >
      <div className="-z-10 max-w-[204px] w-full h-[210px] relative transition-all ">
        <NavLink to={`/product?id=${item._id}`}>
          <img
            className={`${
              item.category === "unknown" ? "" : "" //? NSFW feature
            } object-contain w-full h-full transition-all`}
            src={isHovered ? item?.image[1] : item?.image[0]}
            alt="img-item"
          />
        </NavLink>
        <div className="absolute flex flex-col gap-3 text-sm top-5 right-4 transition-all opacity-0  group-hover:opacity-90 -translate-x-[50%] group-hover:translate-x-[5%]">
          <div
            className={`${isFavorite} block p-2 bg-white rounded-full shadow hover:bg-yellowColor hover:text-white group text-yellowColor`}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </div>
          <div className="block p-2 bg-white rounded-full shadow hover:bg-yellowColor hover:text-white text-yellowColor">
            <PiBinocularsBold />
          </div>
          <div className="block p-2 bg-white rounded-full shadow hover:bg-yellowColor hover:text-white text-yellowColor">
            <MdCompareArrows />
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 transition-all  flex items-center justify-center gap-5 p-3 uppercase bg-white border-b border-gray border-opacity-20 text-yellowColor 
         opacity-0 group-hover:opacity-100 translate-y-[50%] group-hover:translate-y-[0] 
         hover:bg-yellowColor hover:text-white z-0 hover:border-b hover:border-yellowColor 
         "
        >
          <span>
            <FaCartPlus />
          </span>
          <span>add to carts</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 p-5 capitalize">
        <span className="text-sm font-light text-gray text-opacity-9 0">
          {item?.type}
        </span>
        <h1 className="text-sm font-normal text-center overflow-hidden overflow-ellipsis max-h-[40px]">
          {item.name}
        </h1>
        <h2 className="text-base font-normal text-center text-yellowColor">
          ${item?.price}
        </h2>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center ">
            {Array(5)
              .fill(0)
              .map((item) => (
                <ReviewIcon key={v4()}></ReviewIcon>
              ))}
          </div>
          <span className="capitalize text-gray text-opacity-60">
            ({item && item?.reviews ? item?.reviews?.length : 0} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardShop;
