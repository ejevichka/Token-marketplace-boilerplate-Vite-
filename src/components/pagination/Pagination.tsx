import React, { useCallback } from "react";
import { UnsplashSearchFilter } from "../../domains/unsplash";

type SortSelectProps = {
  setCurrentPage: (value: number) => void;
  setFilter: (value: (prevFilter: UnsplashSearchFilter) => UnsplashSearchFilter) => void;
  currentPage: number;
  totalPages: number;
};

export const Pagination: React.FC<SortSelectProps> = ({ currentPage, setCurrentPage, setFilter, totalPages }) => {
  console.log("currentPage", currentPage)
  console.log("totalPages", totalPages)
  const handlePrev = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setFilter((prevFilter) => ({ ...prevFilter, page: currentPage - 1 }));
    }
  }, [currentPage, setCurrentPage, setFilter]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setFilter((prevFilter) => ({ ...prevFilter, page: currentPage + 1 }));
    }
  }, [currentPage, totalPages, setCurrentPage, setFilter]);

  return (
    <div className="text-center my-5">
    <button
      onClick={handlePrev}
      disabled={currentPage === 1}
      className="px-4 py-2 mr-2 bg-black-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      Prev
    </button>
    <button
      onClick={handleNext}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-black-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
  );
};
