"use client";
import React from 'react';
import styles from '../../../../styles/page.module.css';

interface PaginationProps {
  currentPage: number;
  handlePagination: (nextPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  handlePagination,
}) => {
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <div className={styles.paginationContainer}>
      <button
        onClick={() => handlePagination(previousPage)}
        disabled={currentPage === 1}
        className={styles.paginationButton}
      >
        Previous
      </button>
      <span className={styles.currentPage}>{currentPage}</span>
      <button
        onClick={() => handlePagination(nextPage)}
        disabled={currentPage === 100}
        className={styles.paginationButton}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
