import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { LiaBinocularsSolid, LiaHeart, LiaHeartSolid } from "react-icons/lia";
import { v4 } from "uuid";
import { Link, NavLink } from "react-router-dom";
import parse from "html-react-parser";
import { formatPrice } from "../../utils/utils";

export const ReviewIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 text-yellowColor"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const CardGrid = ({ item }) => {
  const [isHover, setIsHover] = useState(false);

  const handleHoverImage = () => {
    setIsHover(true);
  };

  const handleNotHoverImage = () => {
    setIsHover(false);
  };

  return (
    <div className="grid items-center grid-cols-4 py-10 mb-10 border-b border-gray border-opacity-20">
      {/* image */}
      <NavLink
        to={`/product?id=${item._id}`}
        onMouseEnter={handleHoverImage}
        onMouseLeave={handleNotHoverImage}
        className="max-w-[180px] h-[180px] w-full col-span-1 relative"
      >
        <img
          className={`absolute top-0 right-0 left-0 w-full h-full object-contain p-2 transition duration-500 
              ${isHover ? "opacity-0 scale-105" : "opacity-100 scale-100"} ${
            item?.type === "unknown" ? "blur-xl" : ""
          }`}
          src={item?.image[0]}
          alt="img"
        />
        <img
          className={`absolute top-0 right-0 left-0 w-full h-full object-contain p-2 transition duration-500 transform 
              ${isHover ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
          src={item?.image[1]}
          alt=""
        />
      </NavLink>
      {/* info */}
      <div className="flex flex-col col-span-2 gap-5 pr-2">
        <div>
          <div className="text-sm font-light capitalize text-gray text-opacity-80">
            <span>{item?.brand}</span>
            {" , "}
            <span>{item?.category}</span>
          </div>

          <h1 className="text-base text-dark overflow-hidden overflow-ellipsis h-[22px]">
            {item?.name}
          </h1>
        </div>
        <div className="leading-6 text-sm text-gray overflow-hidden overflow-ellipsis font-light h-[78px]">
          {parse(item?.description)}
        </div>
      </div>
      {/* chuc nang */}
      <div className="flex flex-col col-span-1 gap-4 text-opacity-50 text-gray">
        <div className="text-[17px] text-yellowColor px-2">
          {formatPrice(item?.price)}Đ
        </div>
        <div className="flex items-center gap-4 px-2 ">
          <div className="flex items-center ">
            {Array(item?.rating)
              .fill(0)
              .map((item) => (
                <ReviewIcon key={v4()}></ReviewIcon>
              ))}
          </div>
          <div className="text-[13px]">(2 reviews) </div>
        </div>
        <div className="flex items-center text-[13px] justify-around text-gray text-opacity-80">
          <span className="flex items-center justify-center gap-1 transition duration-200 hover:text-yellowColor">
            <LiaBinocularsSolid />
            quick view
          </span>
          <span
            // onClick={() => handleAddItem(item, "wishlists")}
            className={`${""} flex items-center justify-center gap-1  transition duration-200 hover:text-yellowColor`}
          >
            {/* {isFavorite ? <LiaHeartSolid /> : <LiaHeart />} */}
            wishlist
          </span>
        </div>
        <div className="flex items-center transition duration-300 justify-center gap-5 p-3 uppercase bg-white border border-gray border-opacity-20 text-yellowColor max-w-[250px] w-full  hover:bg-yellowColor hover:text-white">
          <span>
            <FaCartPlus />
          </span>
          <span className="text-sm">add to carts</span>
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
