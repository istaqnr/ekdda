"use client";

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { get } from "lodash";
import { useTranslations } from "next-intl";
import { Column } from "@/lib/interfaces";
import { useTableStore } from "@/store/tableStore";
import { CheckboxField } from "@/lib/Form";

interface Resizing {
  index: number;
  startX: number;
  startWidth: number;
}
interface TableHeaderProps<T> {
  rows: any;
  visibleColumns: Column[];
  sorts?: Record<string, any>;
  handleCheck?: any;
  hasExpandedComponent?: any;
  onSortChange?: (column: any) => void;
  setVisibleColumns?: (columns: Column[]) => void;
  hasActions?: boolean;
  fixedActions?: boolean;
  fixedCheckbox?: boolean;
  resizable?: boolean;
  translationSource?: string;
  ExtraRowActions?: React.ComponentType<{ row: T }>;
  actionColSize?: string;
  reverseColorToolbar?: boolean;
  headerBgColor?: string;
  headerTextColor?: string;
}

const DEFAULT_MIN_WIDTH_CELL = 80;
const DEFAULT_MAX_WIDTH_CELL = 200;

export const TableHeader = <T extends Record<string, any>>({
  rows,
  visibleColumns,
  setVisibleColumns,
  sorts,
  handleCheck,
  hasExpandedComponent,
  onSortChange,
  hasActions,
  fixedActions,
  fixedCheckbox,
  resizable,
  translationSource = "INDEX",
  ExtraRowActions,
  actionColSize,
  reverseColorToolbar,
  headerBgColor,
  headerTextColor,
}: TableHeaderProps<T>) => {
  const t = useTranslations(translationSource);

  const [resizing, setResizing] = useState<Resizing | null>(null);
  const [columns, setColumns] = useState<Column[]>([]);
  const { checkedRows } = useTableStore();

  useEffect(() => {
    setColumns(visibleColumns);
  }, [visibleColumns]);

  const handleMouseDown = useCallback(
    (index: number) => (e: { pageX: number }) => {
      setResizing({
        index,
        startX: e.pageX,
        startWidth: columns[index].width ?? 140,
      });
    },
    [columns]
  );

  const handleMouseMove = useCallback(
    (e: { pageX: number }) => {
      if (!resizing) return;
      const diff = e.pageX - resizing.startX;
      const newWidth = Math.max(
        DEFAULT_MIN_WIDTH_CELL,
        resizing.startWidth + diff > DEFAULT_MAX_WIDTH_CELL
          ? DEFAULT_MAX_WIDTH_CELL
          : resizing.startWidth + diff
      );

      setColumns((prevColumns) =>
        prevColumns.map((col, index) =>
          index === resizing.index ? { ...col, width: newWidth } : col
        )
      );
    },
    [resizing]
  );

  const handleMouseUp = useCallback(() => {
    setResizing(null);
    setVisibleColumns && setVisibleColumns(columns);
  }, [columns, setVisibleColumns]);

  useEffect(() => {
    if (resizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing, handleMouseMove, handleMouseUp]);

  // Calculate checkbox states for indeterminate functionality
  const checkedCount = checkedRows?.length || 0;
  const totalRows = rows?.length || 0;
  const isIndeterminate = checkedCount > 0 && checkedCount < totalRows;
  const isChecked = checkedCount > 0 && checkedCount === totalRows;

  return (
    <TableHead className="shadow-lg p-0 w-full">
      <TableRow
        className={`p-0 ${
          reverseColorToolbar ? "bg-white text-black" : " bg-primary text-white"
        }`}
      >
        {handleCheck && visibleColumns?.length > 0 && (
          <TableCell
            className={`border-r border-r-[#e0e0e0] ${
              fixedCheckbox &&
              "sticky left-0 z-50 before:absolute before:right-[-5px] before:top-0 before:bottom-0 before:w-1 before:bg-linear-to-r before:from-black/5 before:to-transparent"
            }`}
            padding="checkbox"
            sx={{
              backgroundColor: reverseColorToolbar ? "white" : "#2d3748",
              position: fixedCheckbox ? "sticky" : undefined,
              left: fixedCheckbox ? 0 : undefined,
            }}
            aria-label="checkbox-column"
          >
            <CheckboxField
              name="head-checkbox"
              wrapperProps={{
                sx: {
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                },
              }}
              labelProps={{
                sx: {
                  margin: 0,
                },
              }}
              checkboxProps={{
                style: {
                  color: "#FFFFFF", // unchecked color
                  "&.MuiChecked": {
                    color: "#FFFFFF", // checked color
                  },
                  "&.MuiCheckboxIndeterminate": {
                    color: "#FFFFFF", // indeterminate color
                  },
                  "& .MuiSvgIconRoot": {
                    fill: "#FFFFFF", // checkmark color
                  },
                },
              }}
              // inputProps={{
              //    "aria-label": "head-checkbox",
              // }}
              indeterminate={isIndeterminate}
              checked={isChecked && !isIndeterminate}
              onChange={handleCheck}
            />
          </TableCell>
        )}
        {hasExpandedComponent && visibleColumns?.length > 0 && (
          <TableCell className="w-[30px]" aria-label="toggle-detail-column" />
        )}
        {columns?.map((column, index) => {
          const fieldName = get(column, "field");
          const fieldNameAttr = get(column, "valueGetter", fieldName);
          const sortDirection = get(get(sorts, fieldNameAttr), "direction");

          return (
            <TableCell
              key={index}
              sortDirection={sortDirection || false}
              className={`font-normal border-r border-[#e0e0e0] ${
                reverseColorToolbar
                  ? "bg-white text-black"
                  : "bg-primary text-white"
              }  relative overflow-hidden`}
              sx={{
                width: column.width,
                maxWidth: column.width,
                minWidth: column.width,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {onSortChange ? (
                <TableSortLabel
                  active={!!sortDirection}
                  direction={sortDirection || "asc"}
                  onClick={() => onSortChange(column)}
                  className={`w-full h-full flex items-center pl-1 pr-2 ${
                    reverseColorToolbar ? "text-black" : "text-white"
                  }`}
                  sx={{
                    color: reverseColorToolbar ? "#101720" : "white ", // Ensures text stays white in all states
                    fontWeight: 600,
                    "&.MuiTableSortLabel-root": {
                      color: reverseColorToolbar ? "#101720" : "white", // For inactive state (no sort)
                    },
                    "&.Mui-active .MuiTableSortLabel-icon": {
                      color: reverseColorToolbar ? "black" : "white", // Ensures active arrow color is also white
                    },
                    "& .MuiTableSortLabel-icon": {
                      color: reverseColorToolbar ? "black" : "white",
                      marginRight: "-14px",
                      zIndex: 20,
                    },
                  }}
                >
                  <div className="flex-1 min-w-0 ">
                    <Tooltip title={column.headerName} placement="bottom-start">
                      <div className="whitespace-nowrap">
                        {column.headerName}
                      </div>
                    </Tooltip>
                  </div>
                </TableSortLabel>
              ) : (
                <div className="px-4 py-2 text-inherit">
                  {column.headerName}
                </div>
              )}
              {/* Resisable transparent line */}
              {resizable && (
                <div
                  role="presentation"
                  className="absolute right-0 top-0 h-full w-2 cursor-col-resize z-20"
                  onMouseDown={handleMouseDown(index)}
                >
                  <div className="w-1 h-full bg-transparent" />
                </div>
              )}
              {/* Gradient for the sorting arrow   */}
              <div
                className={`absolute z-10 top-0 right-0 h-full w-8 bg-gradient-to-r from-transparent from-0% ${
                  reverseColorToolbar
                    ? "to-white text-black"
                    : "to-primary text-black"
                } to-50% pointer-events-none`}
              />
            </TableCell>
          );
        })}
        {hasActions && visibleColumns?.length > 0 && (
          <TableCell
            sx={{
              color: reverseColorToolbar ? "black" : "white",
              textAlign: "center",
              width: actionColSize,
              height: "100%",
              ...(fixedActions && {
                backgroundColor: reverseColorToolbar ? "white" : "#003476",
                position: "sticky",
                right: 0,
                zIndex: 30,
              }),
            }}
          >
            {t("ACTIONS")}
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};
