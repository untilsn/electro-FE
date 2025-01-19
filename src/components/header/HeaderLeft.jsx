import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const HeaderLeft = ({ category }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative flex items-center justify-between h-full w-full gap-3 px-4 text-darkPrimary  hover:bg-yellowColor group"
        >
            <div className="flex items-center gap-3">
                <span className=" text-3xl text-opacity-90 text-dark ">
                    {hovered ? (
                        <IoMdClose className=" text-light" />
                    ) : (
                        <IoIosMenu className="" />
                    )}
                </span>
                <span className="text-sm font-medium group-hover:text-light">
                    Duyệt danh mục
                </span>
            </div>
            <span className=" group-hover:text-light text-grayColor ">
                <FaChevronDown className="text-xs" />
            </span>
            {/* categori */}
            {/* {hovered && (
        <div className="absolute top-[100%] left-0 right-0 bg-white shadow-lg ">
          {category.slice(0, 6).map((item) => (
            <Link key={item.id} to={`/shop`}>
              <div className="p-5 text-sm capitalize hover:bg-gray hover:bg-opacity-5 text-dark border-b_primary">
                {item?.name}
              </div>
            </Link>
          ))}
        </div>
      )} */}
        </div>
    );
};

export default HeaderLeft;
