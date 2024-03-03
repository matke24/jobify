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

  const handlePageChange = (page: number) => {
    const searchParams: URLSearchParams = new URLSearchParams(search);
    searchParams.set("page", String(page));
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const renderButton = (pageNumber: number, isActive: boolean) => {
    return (
      <button
        key={pageNumber}
        className={`btn page-btn ${isActive && "active"}`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderButtons = () => {
    const buttons = [];

    // FIRST PAGE
    buttons.push(renderButton(1, currentPage === 1));

    if (currentPage > 3) {
      buttons.push(
        <span className="btn page-btn" key="dots-1">
          ...
        </span>
      );
    }

    // PREVIOUS PAGE
    if (currentPage !== 1 && currentPage !== 2) {
      buttons.push(renderButton(currentPage - 1, false));
    }
    // CURRENT PAGE
    if (currentPage !== 1 && currentPage !== totalPages) {
      buttons.push(renderButton(currentPage, true));
    }

    // NEXT PAGE
    if (currentPage !== totalPages && currentPage !== totalPages - 1) {
      buttons.push(renderButton(currentPage + 1, false));
    }

    if (currentPage < totalPages - 2) {
      buttons.push(
        <span className="btn page-btn" key="dots-2">
          ...
        </span>
      );
    }

    // LAST PAGE
    buttons.push(renderButton(totalPages, currentPage === totalPages));

    return buttons;
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

      <div className="btn-container">{renderButtons()}</div>

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
