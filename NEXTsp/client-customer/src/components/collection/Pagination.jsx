// Paginnation component
import React from "react";

function Pagination({ pageIndex, pageCount, onPageChange }) {
  const handleChangeActive = (pageNumber) => {
    onPageChange(pageNumber);
  };
  return (
    <div className="pagination flex gap-2">
      {[...Array(pageCount)].map((_, index) => (
        <a
          key={index}
          onClick={() => handleChangeActive(index + 1)}
          className={pageIndex === index + 1 ? "active" : ""}
        >
          {index + 1}
        </a>
      ))}
    </div>
  );
}

export default Pagination;
