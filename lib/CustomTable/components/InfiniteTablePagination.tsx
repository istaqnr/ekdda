import React, { useRef } from "react";

import PaginationButton from "./PaginationButton";
import { useTableInfiniteScroll } from "@/lib/hooks/useTableScroll";

const InfiniteTablePagination = ({
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  onPageChange,
  page,
}: any) => {
  const tableRef = useRef<HTMLDivElement>(null!);

  useTableInfiniteScroll(
    !!hasNextPage,
    !!isFetchingNextPage,
    fetchNextPage,
    tableRef
  );

  if (!hasNextPage) return null;
  return (
    <div ref={tableRef} className="flex p-5 w-full items-center justify-center">
      {isLoading || isFetchingNextPage ? (
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      ) : hasNextPage ? (
        <PaginationButton
          id="infinite-load-more"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => {
            fetchNextPage && fetchNextPage();
            onPageChange && onPageChange((page ?? 0) + 1);
          }}
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </PaginationButton>
      ) : null}
    </div>
  );
};

export default InfiniteTablePagination;
