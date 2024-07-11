import React from "react";
import { FaAngleRight } from "react-icons/fa6";

const MenuCart = () => {
  return (
    <div className=" h-[500xp] bg-white shadow-md absolute top-[100%] p-10 left-0 w-[300px]">
      <div className="flex flex-col w-full gap-3">
        <div className="flex items-center justify-between w-full text-sm hover:text-yellowColor text-gray text-opacity-90">
          <span>About</span>
          <span>
            <FaAngleRight className="text-sm" />
          </span>
        </div>
        <div className="flex items-center justify-between w-full text-sm hover:text-yellowColor text-gray text-opacity-90">
          <span>Contact 01</span>
          <span>
            <FaAngleRight className="text-sm" />
          </span>
        </div>
        <div className="flex items-center justify-between w-full text-sm hover:text-yellowColor text-gray text-opacity-90">
          <span>About</span>
          <span>
            <FaAngleRight className="text-sm" />
          </span>
        </div>
        <div className="flex items-center justify-between w-full text-sm hover:text-yellowColor text-gray text-opacity-90">
          <span>Login</span>
          <span>
            <FaAngleRight className="text-sm" />
          </span>
        </div>
        <div className="flex items-center justify-between w-full text-sm hover:text-yellowColor text-gray text-opacity-90">
          <span>Error 404</span>
          <span>
            <FaAngleRight className="text-sm" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuCart;
