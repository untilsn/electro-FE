import React from "react";
import { FaCartPlus } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import { Link } from "react-router-dom";

const BoxNoItem = ({ text, icon }) => {
  return (
    <div className="flex flex-col items-center w-full gap-5 p-28 ">
      <i className="text-9xl text-gray">{icon}</i>
      <h1 className="text-xl text-dark">{text}</h1>
      <Link className="p-4 text-white capitalize bg-yellowColor" to={"/shop"}>
        quay về trang mua hàng 
      </Link>
    </div>
  );
};

export default BoxNoItem;
