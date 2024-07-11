import React from "react";

const SearchInput = () => {
  return (
    <div className="flex items-center w-full col-span-2 bg-light rounded-3xl ">
      <span className="px-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="rotate-90 w-7 h-7 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </span>
      <input
        placeholder="Search product..."
        type="search"
        className="w-full h-full p-3 bg-transparent border-none "
      ></input>
    </div>
  );
};

export default SearchInput;
