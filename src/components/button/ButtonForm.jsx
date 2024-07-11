import React from "react";

const ButtonForm = ({
  children,
  kind,
  type = "button",
  isValid,
  classname,
  onClick = () => {},
  content,
  ...props
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        className={`flex items-center justify-between w-full gap-2 p-3 text-sm uppercase transition-all duration-300 border-2 hover:bg-yellowColor group hover:text-light text-yellowColor border-yellowColor ${classname}`}
      >
        {children}
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-yellowColor group-hover:text-light "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default ButtonForm;
