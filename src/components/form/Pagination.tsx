import React, { useCallback } from "react";
import { UnsplashSearchFilter } from "../../domains/unsplash";

type SortSelectProps = {
  setCurrentPage: (value: number) => void;
  setFilter: (value: (prevFilter: UnsplashSearchFilter) => UnsplashSearchFilter) => void;
  currentPage: number;
  totalPages: number;
};

export const Pagination: React.FC<SortSelectProps> = ({ currentPage, setCurrentPage, setFilter, totalPages }) => {
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
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};
