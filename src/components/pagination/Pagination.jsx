import React from "react";

const Pagination = ({ currentPage, totalPage, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      {[...Array(totalPage)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          disabled={currentPage === index + 1}
          className={`px-3 py-1 mx-1 rounded-md focus:outline-none ${
            currentPage === index + 1
              ? "border border-red-500 text-yellowColor"
              : "bg-transparent hover:border hover:border-gray hover:text-yellowColor"
          } border border-transparent`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
