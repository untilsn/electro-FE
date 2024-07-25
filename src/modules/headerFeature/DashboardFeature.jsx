import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NAVBARLIST } from "../../constant/HeaderNavbarList";
import HeaderCategory from "./HeaderCategory";

const DashboardFeature = () => {
  const [itemHover, setItemHover] = useState("");
  const handleMenuHover = (item) => {
    setItemHover(item.name);
  };
  const handleMenuClose = () => {
    setItemHover("");
  };
  return (
    <div className="sticky -top-[1px] z-30 h-[53px]  bg-white shadow-primaryShadow sm:hidden lg:block">
      <div className="container grid grid-cols-[275px_minmax(635px,_1fr)] items-center justify-between">
        {/* categories */}
        <HeaderCategory></HeaderCategory>
        {/* feature */}
        <div className="flex items-center  text-[12px]  capitalize  border-x border-gray border-opacity-10 ">
          {NAVBARLIST.map((item) => (
            <div
              onMouseEnter={() => handleMenuHover(item)}
              onMouseLeave={() => handleMenuClose(item)}
              key={item?.title}
              className={`${(isActive) =>
                isActive
                  ? "text-red-900"
                  : ""}  relative w-full mx-auto text-black group `}
            >
              {location.pathname === item.url ? (
                <NavLink
                  to={item.url}
                  className="flex items-center justify-center gap-2 px-3 py-[17px]"
                >
                  <span className="transition-all text-yellowColor">
                    {item.name}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className={`${
                      !item?.menu ? "opacity-0 hidden" : "opacity-100"
                    } w-3 h-3 text-yellowColor `}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                  <span className="absolute bottom-0 left-0  h-[1px] w-full bg-yellowColor"></span>
                </NavLink>
              ) : (
                <NavLink
                  to={item.url}
                  className="flex items-center justify-center gap-2 px-3 py-[17px]"
                >
                  <span className="transition-all group-hover:text-yellowColor">
                    {item.name}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className={`${
                      !item?.menu ? "hidden" : ""
                    } w-3 h-3 text-gray group-hover:text-yellowColor`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full bg-yellowColor"></span>
                  <span className="absolute bottom-0 right-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full bg-yellowColor"></span>
                </NavLink>
              )}
              <div
                className={`transition-opacity duration-300 ${
                  itemHover === item.name
                    ? "opacity-100"
                    : "opacity-0 select-none invisible"
                }`}
              >
                {item.menu}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardFeature;
