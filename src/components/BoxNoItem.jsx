import React from "react";
import { FaCartPlus } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import { Link } from "react-router-dom";

const BoxNoItem = ({ type = "wishlists" }) => {
  return (
    <div className="flex flex-col items-center w-full gap-5 p-28 ">
      {type === "wishlists" ? (
        <GrFavorite className="text-9xl text-opacity-60 text-dark" />
      ) : (
        <FaCartPlus className="text-9xl text-opacity-60 text-dark" />
      )}

      <h1 className="text-xl text-dark">No products added to the {type}</h1>
      <Link className="p-4 text-white capitalize bg-yellowColor" to={"/shop"}>
        reture to shop
      </Link>
    </div>
  );
};

export default BoxNoItem;
