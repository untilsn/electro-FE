import React, { useState } from "react";
import { dashboardLink } from "./DashboardLink";
import BrowserCategories from "./BrowserCategories";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import MenuShop from "../menu/MenuShop";
import { useSelector } from "react-redux";

const DashboardFeature = () => {
  const { categories } = useSelector((state) => state.store);
  const location = useLocation();
  const [itemHover, setItemHover] = useState("");
  const handleMenuHover = (item) => {
    setItemHover(item.name);
  };
  const handleMenuClose = () => {
    setItemHover("");
  };
  return (
    <div className="sticky -top-[1px] z-30 h-[53px]  bg-white shadow-primaryShadow">
      <div className="container grid items-center justify-between grid-cols-4">
        {/* categories */}
        <BrowserCategories category={categories}></BrowserCategories>
        {/* feature */}
        <div className="flex items-center col-span-2  text-[13px] capitalize">
          {dashboardLink.map((item) => (
            <div
              onMouseEnter={() => handleMenuHover(item)}
              onMouseLeave={() => handleMenuClose(item)}
              key={item?.name}
              className="relative w-full mx-auto text-black group"
            >
              {location.pathname === item.url ? (
                <NavLink
                  to={item?.url}
                  className="flex items-center justify-center gap-2 px-3 py-[17px]"
                >
                  <span className="text-yellowColor">{item.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className={`${
                      !item?.menu ? "hidden" : ""
                    } w-3 h-3 text-yellowColor`}
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
                  to={item?.url}
                  className="flex items-center justify-center gap-2 px-3 py-[17px]"
                >
                  <span className="group-hover:text-yellowColor">
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
              {itemHover === item.name ? item.menu : ""}
              {/* <Outlet></Outlet> */}
            </div>
          ))}
        </div>

        {/* notion */}
        <div className="text-sm text-end">
          <span>Clearance</span>
          <span className="font-semibold">&nbsp;Up to 30% Off</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardFeature;
