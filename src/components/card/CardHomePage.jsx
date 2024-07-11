import React, { useState } from "react";
import { v4 } from "uuid";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { BiSolidBinoculars } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCheckCart } from "../../hooks/useCheckCart";
import { useCheckFavorite } from "../../hooks/useCheckFavorite";
import parse from "html-react-parser";

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

const CardHomePage = ({ item, classes }) => {
  const [isHover, setIsHover] = useState(false);
  const handleHoverImage = () => {
    setIsHover(true);
  };
  const handleNotHoverImage = () => {
    setIsHover(false);
  };
  const isCart = useCheckCart(item);
  const isFavorite = useCheckFavorite(item);
  return (
    <div
      onMouseEnter={handleHoverImage}
      onMouseLeave={handleNotHoverImage}
      className={`group hover:shadow-itemShadow relative max-w-[370px] w-full h-[450px] border border-gray border-opacity-15 bg-white ${classes}`}
    >
      <div className="relative w-full overflow-hidden ">
        <Link to={`/product?id=${item?._id}`}>
          <div
            className={`relative w-full h-[276px] overflow-hidden ${classes}`}
          >
            <img
              className={`absolute top-0 left-0 w-full h-full object-contain ${
                isHover ? "opacity-0 transition-all duration-0" : "opacity-100"
              } ${item.type === "unknown" ? "blur-xl" : ""}`}
              src={item?.image[0]}
              alt=""
            />
            <img
              className={`absolute top-0  left-0 w-full h-full object-contain ${
                isHover
                  ? "opacity-100"
                  : "opacity-0 transition-all  duration-[300ms]"
              }`}
              src={item?.image[1]}
              alt=""
            />
          </div>
          {/* <div
            className={`relative w-full h-[276px] overflow-hidden ${classes}`}
          >
            {item?.images?.map((img) => (
              <img
                className={`absolute top-0 left-0 w-full h-full object-contain ${
                  isHover
                    ? "opacity-0 transition-all duration-0"
                    : "opacity-100"
                } ${item.type === "unknown" ? "blur-xl" : ""}`}
                src={img}
                alt=""
              />
            ))}
          </div> */}
        </Link>
        {/* Heart icon */}
        <div className="absolute p-3 rounded-full right-6 top-6 bg-yellowColor transition-all opacity-0 group-hover:opacity-90 -translate-x-[50%] group-hover:translate-x-[5%] ">
          {isFavorite ? (
            <FaHeart className="text-dark"></FaHeart>
          ) : (
            <FaRegHeart />
          )}
        </div>
        {/* Cart and Binoculars icons */}
        <div
          className="absolute -bottom-1 left-0 right-0  text-base flex items-center justify-evenly h-[50px] bg-darkPrimary text-light 
          translate-y-[100%]  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all"
        >
          <div>
            <FaCartPlus
              className={`${
                isCart === true ? "text-yellowColor" : "text-white"
              } hover:text-yellowColor`}
            />
          </div>
          <hr className="h-[60%] w-[1px] bg-white" />
          <div>
            <BiSolidBinoculars className="hover:text-yellowColor" />
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col gap-2 p-5 bg-white ">
        <div className="capitalize text-gray">{item?.type}</div>
        <h1 className="overflow-hidden text-base overflow-ellipsis h-[50px]">
          {item?.name}
        </h1>
        <h2 className="text-base text-yellowColor">${item?.price}</h2>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(0)
              .map((item) => (
                <ReviewIcon key={v4()} />
              ))}
          </div>
          <span className="capitalize text-gray text-opacity-60">
            {parse(`${item?.description}`)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardHomePage;
