import React from "react";
import { TableCell, TableRow, Skeleton, CircularProgress } from "@mui/material";
import { ViewComfy as ViewComfyIcon, ReportProblem } from "@mui/icons-material";

import get from "lodash/get";
import { Column } from "@/lib/interfaces";

const TableLoadingAndErrorHandling = ({
  visibleColumns,
  checkRowsOn,
  hasExpandedComponent,
  isLoading,
  error,
}: {
  visibleColumns: Column[];
  checkRowsOn?: boolean;
  hasExpandedComponent?: boolean | undefined;
  isLoading?: boolean;
  error: any;
}) => (
  <TableRow>
    <TableCell
      colSpan={
        (visibleColumns?.length ?? 0) +
        (checkRowsOn ? 1 : 0) +
        (hasExpandedComponent ? 1 : 0) +
        1
      }
      className="p-5 h-[150px]"
    >
      {isLoading ? (
        <>
          <Skeleton animation="wave" height={30} />
          <Skeleton animation="wave" height={30} />
          <div className="flex w-full justify-center">
            <CircularProgress />
          </div>
        </>
      ) : (
        <div className="flex w-full justify-center">
          {error ? (
            <span className="flex items-center gap-1 text-blue-800">
              <ReportProblem />
              {get(error, "message", "Unexpected error")}
            </span>
          ) : (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                <ViewComfyIcon
                  className="text-gray-300"
                  style={{
                    fontSize: "32px",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)",
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)",
                  }}
                />
              </div>
              <span className="text-gray-400 text-sm font-medium">
                Δεν υπάρχουν δεδομένα
              </span>
            </div>
          )}
        </div>
      )}
    </TableCell>
  </TableRow>
);

export default TableLoadingAndErrorHandling;
