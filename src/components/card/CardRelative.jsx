import React, { useState } from "react";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import { PiBinocularsBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCheckFavorite } from "../../hooks/useCheckFavorite";

const CardRelative = ({ item }) => {
  const [cardHover, setCardHover] = useState(false);
  const isFavorite = useCheckFavorite(item);
  return (
    <div
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
      className="overflow-hidden group hover:shadow-itemShadow"
    >
      <div className="max-w-[400px] w-full relative overflow-hidden">
        <NavLink to={`/product?id=${item?.productId}`}>
          <img
            className="object-contain w-full h-[340px] "
            src={`${cardHover ? item.images[1] : item.images[0]}`}
            alt=""
          />
        </NavLink>
        <ul className="absolute flex flex-col gap-3 text-sm top-4 right-4 transition-all opacity-0 group-hover:opacity-90 -translate-x-[50%] group-hover:translate-x-[5%]">
          <li
            className={`${
              isFavorite
                ? "bg-dark text-yellowColor"
                : "bg-white text-yellowColor"
            } p-3  rounded-full hover:bg-yellowColor hover:text-white `}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </li>
          <li className="p-3 bg-white rounded-full hover:bg-yellowColor hover:text-white text-yellowColor">
            <PiBinocularsBold />
          </li>
          <li className="p-3 bg-white rounded-full hover:bg-yellowColor hover:text-white text-yellowColor">
            <MdCompareArrows />
          </li>
        </ul>
        <div
          className="absolute bottom-0 left-0 right-0 transition-all flex items-center justify-center gap-5 p-4 uppercase bg-darkPrimary border-b border-gray border-opacity-20 text-white 
         opacity-0 group-hover:opacity-100 translate-y-[50%] group-hover:translate-y-[0]
         hover:bg-yellowColor hover:text-white group/item 
         "
        >
          <span className="text-yellowColor group-hover/item:text-white">
            <FaCartPlus />
          </span>
          <span className="text-white group-hover/item:text-white">
            add to cart
          </span>
        </div>
      </div>
      <div className="z-0 flex flex-col items-center gap-2 p-5 capitalize">
        <NavLink to={`/product?id=${item?.productId}`}>
          <h1 className="text-sm font-normal text-center text-black overflow-hidden overflow-ellipsis h-[40px]">
            {item?.title}
          </h1>
        </NavLink>

        <h2 className="text-sm font-normal text-center text-yellowColor">
          ${item?.price}
        </h2>
      </div>
    </div>
  );
};

export default CardRelative;
