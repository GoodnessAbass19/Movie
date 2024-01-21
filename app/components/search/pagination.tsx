"use client";

import { useState } from "react";
import {
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  // const number = searchParams.get()
  const [page, setPage] = useState(1);
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const renderPaginationButtons = () => {
    const totalPages = 20;
    const currentPage = page;
    const visiblePages = 5;
    const delta = Math.floor((visiblePages - 1) / 2);
    let start = currentPage - delta;
    let end = currentPage + delta;

    if (totalPages <= visiblePages) {
      start = 1;
      end = totalPages;
    } else {
      if (currentPage <= delta) {
        start = 1;
        end = visiblePages;
      } else if (currentPage >= totalPages - delta) {
        start = totalPages - visiblePages + 1;
        end = totalPages;
      } else {
        start = currentPage - delta;
        end = currentPage + delta;
      }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          // href={`/search?search=${search}&page=${i}`} // Fix the href to use i directly
          className={`${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          } hover:bg-blue-500 hover:text-white font-semibold py-2 px-2.5 md:px-4 mx-1 rounded`}
          onClick={() => {
            handlePageChange(i);
            router.push(`/search?search=${search}&page=${i}`);
          }}
        >
          {i}
        </button>
      );
    }

    const paginationButtons = [
      <button
        key="prev"
        className={`${
          currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
        } bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 md:px-4 rounded`}
        // href={`/search?search=${search}&page=${currentPage - 1}`}
        onClick={() => {
          handlePageChange(currentPage - 1);
          router.push(`/search?search=${search}&page=${currentPage - 1}`);
        }}
        disabled={currentPage === 1}
      >
        Previous
      </button>,
      pages,
      <button
        key="next"
        // href={`/search?search=${search}&page=${currentPage + 1}`}
        className={`${
          currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
        } bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 md:px-4 rounded`}
        onClick={() => {
          handlePageChange(currentPage + 1);
          router.push(`/search?search=${search}&page=${currentPage + 1}`);
        }}
        disabled={currentPage === totalPages}
      >
        Next
      </button>,
    ];

    if (end < totalPages) {
      paginationButtons.splice(
        paginationButtons.length - 1,
        0,

        <PaginationEllipsis key={"dots"} className="text-white mx-1" />
      );
    }

    return paginationButtons;
  };

  return (
    <div className="flex justify-center mt-5">{renderPaginationButtons()}</div>
  );
};

export default Pagination;
