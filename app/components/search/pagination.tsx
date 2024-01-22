"use client";

import { useState, useEffect } from "react";
import {
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

const Paginations = ({
  total,
  link,
}: {
  total: number | undefined;
  link: string;
}) => {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const router = useRouter();

  // Update page state when searchParams.page changes
  useEffect(() => {
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    setPage(isNaN(currentPage) ? 1 : currentPage);
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`${link}page=${newPage}`);
  };

  const renderPaginationButtons = () => {
    const totalPages = total || 20;
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
          className={`${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          } hover:bg-blue-500 hover:text-white font-semibold py-2 px-2.5 md:px-4 mx-1 rounded`}
          onClick={() => {
            handlePageChange(i);
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
        onClick={() => {
          handlePageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        Previous
      </button>,
      pages,
      <button
        key="next"
        className={`${
          currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
        } bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 md:px-4 rounded`}
        onClick={() => {
          handlePageChange(currentPage + 1);
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

export default Paginations;
