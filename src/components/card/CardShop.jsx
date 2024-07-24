import React, { useState } from "react";
import { v4 } from "uuid";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";

export const ReviewIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-[14px] h-[14px] text-yellowColor"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const CardShop = ({ item, classes, size = "normal" }) => {
  console.log(item);
  const [isHover, setIsHover] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCart, setIsCart] = useState(false);

  const cardSizes = {
    normal: "max-w-[275px] h-[420px]",
    small: "max-w-[200px] h-[340px]",
  };

  const imageSizes = {
    normal: "h-[275px]",
    small: "h-[200px]",
  };

  const textSizes = {
    normal: "text-base",
    small: "text-sm",
  };

  const handleHoverImage = () => {
    setIsHover(true);
  };

  const handleNotHoverImage = () => {
    setIsHover(false);
  };

  return (
    <div
      className={`group hover:shadow-itemShadow transition duration-500 relative w-full border border-gray border-opacity-15 bg-white ${classes} ${cardSizes[size]}`}
    >
      <div
        onMouseEnter={handleHoverImage}
        onMouseLeave={handleNotHoverImage}
        className="relative w-full overflow-hidden"
      >
        {/* image */}
        <div
          className={`relative w-full overflow-hidden p-2 ${imageSizes[size]}`}
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
        </div>
        {/* favorite */}
        <div
          className="absolute w-7 h-7 flex items-center justify-center rounded-full right-4 top-4 bg-darkPrimary transition duration-300 
        opacity-0 group-hover:opacity-100 -translate-x-[50%] group-hover:translate-x-[5%] text-light text-sm "
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </div>
        {/* add cart */}
        <button
          className="absolute bottom-0 left-0 right-0  flex items-center opacity-20 hover:bg-yellowColor
           justify-center gap-3 h-[40px] bg-darkPrimary text-light text-sm translate-y-[100%] group-hover:opacity-100
           group-hover:visible group-hover:translate-y-0 transition duration-300"
        >
          <div>
            <FaCartPlus
              className={`${
                isCart === true ? "text-yellowColor" : "text-white"
              } hover:text-yellowColor text-sm`}
            />
          </div>
          add to carts
        </button>
        {/* content */}
      </div>
      <div className="flex flex-col gap-1 px-3 py-2 bg-white ">
        <div
          className={`capitalize text-gray text-opacity-80 font-light text-sm truncate`}
        >
          {item?.category}
        </div>
        <h1
          className={`overflow-hidden text-darkPrimary  text-base overflow-ellipsis h-[50px] line-clamp-2`}
        >
          {item?.name}
        </h1>
        <h2 className={`text-yellowColor ${textSizes[size]}`}>
          {(item?.price).toLocaleString("vi-VN")}đ
        </h2>
        <div className="flex items-center gap-3 text-nowrap overflow-ellipsis">
          <div className="flex items-center gap-1">
            {Array(item?.rating)
              .fill(0)
              .map(() => (
                <ReviewIcon className="text-xs" key={v4()} />
              ))}
          </div>
          <span
            className={`capitalize text-gray text-opacity-60 text-sm truncate`}
          >
            {/* 2 {parse(`${item?.description}` || "reviews")} */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardShop;
