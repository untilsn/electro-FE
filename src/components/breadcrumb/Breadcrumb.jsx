import { Breadcrumbs } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ children, url, item }) => {
  return (
    <div className="border-b border-gray border-opacity-10">
      <div className="container">
        <div className={item ? "flex items-center justify-between" : ""}>
          <Breadcrumbs className="p-0 py-3 capitalize bg-transparent ">
            <Link
              to="/"
              className="py-1 text-sm font-normal hover:text-blueColor-800 hover:text-yellowColor text-opacity-80 text-dark"
            >
              Home
            </Link>
            <Link
              to={`/${children}`}
              className="py-1 text-sm font-normal hover:text-blueColor-800 hover:text-yellowColor text-darkPrimary"
            >
              {children}
            </Link>
            {url ? (
              <Link
                to={`/${url}`}
                className="py-1 text-sm font-normal hover:text-blueColor-800 hover:text-yellowColor text-darkPrimary"
              >
                {url}
              </Link>
            ) : (
              ""
            )}
          </Breadcrumbs>
          {item ? (
            <div className="flex items-center gap-3">
              <img
                src="https://source.unsplash.com/random"
                alt="avatar"
                className="object-cover w-5 h-5 rounded-full"
              />
              <div>{item?.displayName}</div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
