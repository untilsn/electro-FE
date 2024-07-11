import React from "react";

const ButtonItem = ({ children, kind = "primary", className }) => {
  return (
    <button
      className={`${
        kind === "primary"
          ? "inline-flex items-center gap-3 px-5 py-3 text-sm rounded-full bg-yellowColor text-light"
          : "bg-transparent border border-gray  inline-flex items-center gap-3 px-5 py-4 text-sm rounded-full border-opacity-60 hover:bg-light hover:text-yellowColor"
      } ${className}  `}
    >
      {children}
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 "
        >
          <path
            fillRule="evenodd"
            d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </button>
  );
};

export default ButtonItem;
