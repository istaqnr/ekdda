import React from "react";
import { useTranslations } from "next-intl";
import { Checkbox, Typography } from "@mui/material";
import CustomModal from "@/lib/CustomModal";
import { Column } from "@/lib/interfaces/global";

interface ColumnsModalProps {
  open: boolean;
  onClose: () => void;
  columns: Column[];
  visibleColumns: Column[];
  setVisibleColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  translationSource?: "ACMS" | "INDEX"; //MAYTODO wrong separation of concerns, in normal way translates should derive from parent
}

export const ColumnsModal: React.FC<ColumnsModalProps> = ({
  open,
  onClose,
  columns,
  visibleColumns,
  setVisibleColumns,
  translationSource,
}) => {
  const t = useTranslations(translationSource);
  const t_o = useTranslations();

  const columnsField = visibleColumns?.map((col) => col.field);

  const handleColumnToggle = (column: Column) => {
    const columnField = column.field;
    let newVisibleColumns: Column[] = [];
    if (columnsField.includes(columnField)) {
      newVisibleColumns = visibleColumns.filter(
        ({ field }) => field !== columnField
      );
    } else {
      const newCol: any = columns?.find(
        (column) => column.field === columnField
      );
      newVisibleColumns = [...visibleColumns, newCol];
    }

    setVisibleColumns(newVisibleColumns);
  };

  return (
    <CustomModal
      open={open}
      title={t("INDEX.VISIBLE_COLUMNS")}
      onCancel={onClose}
    >
      <div className="flex flex-wrap">
        {columns?.map((column) => {
          return (
            <div
              key={column.field}
              className="flex flex-wrap w-1/2 items-center h-auto mb-2"
            >
              <Checkbox
                color="primary"
                checked={columnsField?.includes(column.field)}
                onChange={() => handleColumnToggle(column)}
              />
              <Typography>{t(column.headerName)}</Typography>
            </div>
          );
        })}
      </div>
    </CustomModal>
  );
};

export default ColumnsModal;
