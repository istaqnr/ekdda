import React from "react";
import { useTranslations } from "next-intl";
import PaginationButton from "./PaginationButton";
import FirstPageIcon from "../icons/FirstPageIcon";

import LastPageIcon from "../icons/LastPageIcon";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

const TablePagination = ({ pageSize, rowCount, page, onPageChange, onPageSizeChange, totalPages }: any) => {
   const t = useTranslations("INDEX");
   const optionCount = [5, 10, 25, 50];

   return (
      <div className="flex flex-col md:flex-row  items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
         {/* Rows per page selector */}
         <div className="flex items-center space-x-2 mb-3 sm:mb-0">
            <label htmlFor="rowsPage" className="text-sm text-gray-700">
               {t("ROWS_PER_PAGE")}:
            </label>
            <select
               id="rowsPage"
               aria-label="rows per page"
               aria-labelledby="rowsPage"
               value={pageSize || 0}
               onChange={(event) => {
                  const newPageSize = parseInt(event.target.value, 10);
                  onPageSizeChange && onPageSizeChange(newPageSize);
               }}
               className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
               {optionCount.map((option) => (
                  <option key={option} value={option}>
                     {option}
                  </option>
               ))}
            </select>
         </div>

         {/* Pagination info and controls */}
         <div className="flex items-center space-x-4">
            {/* Page info */}
            <div className="text-sm flex flex-col md:flex-row items-center justify-center  text-gray-700">
               <div>
                  {(page || 0) * (pageSize || 0) + 1}-
                  {Math.min((page || 0) + 1, Math.ceil((rowCount || 0) / (pageSize || 1))) * (pageSize || 0)}{" "}
                  {t("OF")} {rowCount || 0}
               </div>
               <div className="text-sm text-gray-700">
                  ({t("PAGE")} {(page ?? 0) + 1} {t("OF")} {totalPages})
               </div>
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center space-x-1">
               {(() => {
                  const totalPages = rowCount && pageSize ? Math.ceil(rowCount / pageSize) : 0;
                  const currentPage = page ?? 0;

                  return (
                     <>
                        <PaginationButton
                           onClick={() => onPageChange && onPageChange(0)}
                           icon={<FirstPageIcon />}
                           disabled={currentPage === 0}
                        />
                        <PaginationButton
                           onClick={() => onPageChange && onPageChange(currentPage - 1)}
                           icon={<ArrowLeftIcon />}
                           disabled={currentPage === 0}
                        />
                        <PaginationButton
                           onClick={() => onPageChange && onPageChange(currentPage + 1)}
                           icon={<ArrowRightIcon />}
                           disabled={currentPage >= totalPages - 1}
                        />
                        <PaginationButton
                           onClick={() => onPageChange && onPageChange(totalPages - 1)}
                           icon={<LastPageIcon />}
                           disabled={currentPage >= totalPages - 1}
                        />
                     </>
                  );
               })()}
            </div>
         </div>
      </div>
   );
};

export default TablePagination;
