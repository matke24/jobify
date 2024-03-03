import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useAllJobContext } from "../pages/AllJobs";
import { useLocation, useNavigate } from "react-router-dom";

const JobPagination: React.FC = () => {
  const {
    pagination: { currentPage, totalPages },
  } = useAllJobContext();

  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const pageBtns = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (page: number) => {
    const searchParams: URLSearchParams = new URLSearchParams(search);
    console.log(searchParams);
    searchParams.set("page", String(page));
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = totalPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>

      <div className="btn-container">
        {pageBtns.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn page-btn ${currentPage === pageNumber && "active"}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > totalPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};

export default JobPagination;
