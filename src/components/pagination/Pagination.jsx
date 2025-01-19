import React from "react";

const Pagination = ({ currentPage, total, limit, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);

  const handlePageClick = (page) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };


  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-3 py-2 font-semibold rounded ${page === currentPage ? "bg-dark text-yellowColor" : "bg-gray-200 text-black hover:bg-gray-300"}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Next
      </button>
    </div>

  );
};

export default Pagination;
