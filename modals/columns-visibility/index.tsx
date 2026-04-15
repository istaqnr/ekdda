import React, { useState, useEffect } from "react";
import { Checkbox, IconButton, Typography } from "@mui/material";
import get from "lodash/fp/get";
import { useTranslations } from "next-intl";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

import { useGlobalStore } from "@/store/globalStore";

import { useTableStore } from "@/store/tableStore";

import { Column } from "@/lib/interfaces";
import CustomModal from "@/lib/CustomModal";

export const ColumnsVisibility: React.FC = () => {
  const t = useTranslations();
  const { modalOpen, closeModal, modalProps } = useGlobalStore();
  const { visibleColumns, toggleColumn, setVisibleColumns } = useTableStore();

  const urlKey = get("urlKey", modalProps);
  const translationSource = get("translationSource", modalProps);

  const [columns, setColumns] = useState<Column[]>(modalProps?.columns || []);

  useEffect(() => {
    if (modalOpen) {
      const updatedColumns = [...(modalProps?.columns || [])];
      const visibleOrder = visibleColumns[urlKey] || [];

      // Reorder columns based on visibleColumns state (matching by field)
      const reorderedColumns = updatedColumns.sort((a, b) => {
        const indexA = visibleOrder.findIndex((col) => col.field === a.field);
        const indexB = visibleOrder.findIndex((col) => col.field === b.field);
        return indexA - indexB;
      });

      // Ensure unchecked columns appear at the bottom of the list
      const finalColumns = reorderedColumns.sort((a, b) => {
        const isAVisible = visibleColumns[urlKey]?.some(
          (col) => col.field === a.field
        );
        const isBVisible = visibleColumns[urlKey]?.some(
          (col) => col.field === b.field
        );
        return Number(isBVisible) - Number(isAVisible);
      });

      setColumns(finalColumns);
    }
  }, [modalOpen, modalProps, visibleColumns, urlKey]);

  const handleConfirm = async () => {
    const updatedColumns = columns.filter((column) =>
      visibleColumns[urlKey]?.some((c) => c.field === column.field)
    );

    setVisibleColumns(urlKey, updatedColumns);
    await modalProps?.onConfirm(updatedColumns);
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  const moveColumn = (index: number, direction: "up" | "down") => {
    const newColumns = [...columns];
    const [movedColumn] = newColumns.splice(index, 1);

    direction === "down"
      ? newColumns.splice(
          index === newColumns.length ? 0 : index + 1,
          0,
          movedColumn
        )
      : newColumns.splice(
          index === 0 ? newColumns.length : index - 1,
          0,
          movedColumn
        );

    setColumns(newColumns);
  };

  return (
    <CustomModal
      open={modalOpen}
      title={modalProps?.title}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    >
      <div className="font-bold flex justify-center mt-2 mb-5 text-xl">
        {t("INDEX.TOGGLE_COLUMNS_VISIBILITY")}
      </div>
      <div>
        {columns.map((column: Column, index: number) => (
          <div
            key={column.field}
            className="flex w-full justify-between items-center h-auto py-1 duration-200 hover:bg-gray-200 hover:rounded-md"
          >
            <div className="flex items-center w-[450px]">
              <Checkbox
                color="primary"
                checked={visibleColumns[urlKey]?.some(
                  (c) => c.field === column.field
                )}
                onChange={() => toggleColumn(urlKey, column)}
                inputProps={{
                  "aria-label": `checkbox-${column.field}`,
                }}
              />
              <Typography>
                {translationSource
                  ? t(`${translationSource}.${column.headerName}`)
                  : column.headerName}
              </Typography>
            </div>
            <div className="w-[90px]">
              <IconButton
                aria-label={`move-up-${column.field}`}
                onClick={() => moveColumn(index, "up")}
                sx={{
                  color: "#d1d5db",
                  "&:hover": { color: "#112D63" },
                }}
              >
                <ExpandCircleDownIcon className="rotate-180" />
              </IconButton>
              <IconButton
                aria-label={`move-down-${column.field}`}
                onClick={() => moveColumn(index, "down")}
                sx={{
                  color: "#d1d5db",
                  "&:hover": { color: "#112D63" },
                }}
              >
                <ExpandCircleDownIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </CustomModal>
  );
};

export default ColumnsVisibility;
