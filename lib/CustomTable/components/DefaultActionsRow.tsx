import React from "react";
import {
  CopyAll,
  Delete,
  Edit,
  Visibility,
  Close,
  Download,
} from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { UnifiedButton } from "@/lib/Form/Button";

const disabledIconStyle = (disabled: boolean) => ({
  cursor: disabled ? "not-allowed" : "pointer",
  color: disabled ? "gray" : "inherit",
  opacity: disabled ? 0.5 : 1,
});

const DefaultActionsRow = ({
  row,
  handleView,
  handleEdit,
  handleDelete,
  onDownload,
  disableView,
  disableEdit,
  disableDelete,
  copyRowOn,
  editableFieldsOn,
  ExtraRowActions,
  handleCopyRow,
  rowIndex,
}: any) => {
  const t = useTranslations("INDEX");
  const isAdded = !!row.isCopied || !!row.isCreated;

  return (
    <div className="w-full flex justify-center items-center gap-1">
      {!copyRowOn && editableFieldsOn && (
        <UnifiedButton
          onlyIcon
          tooltipTitle={t("COPY")}
          onClick={() => handleCopyRow(row, rowIndex)}
          icon={<CopyAll className="text-gray-800" />}
          size="small"
        />
      )}
      {handleView && (
        <UnifiedButton
          onlyIcon
          tooltipTitle={t("VIEW")}
          onClick={!disableView ? () => handleView(row) : undefined}
          icon={<Visibility className="text-gray-800" />}
          size="small"
        />
      )}
      {handleEdit && (
        <UnifiedButton
          onlyIcon
          tooltipTitle={t("EDIT")}
          onClick={!disableEdit ? () => handleEdit(row) : undefined}
          icon={<Edit className="text-gray-800" />}
          size="small"
        />
      )}
      {onDownload && (
        <UnifiedButton
          onlyIcon
          icon={<Download />}
          onClick={() => onDownload(row)}
        />
      )}
      {!copyRowOn && handleDelete && (
        <UnifiedButton
          onlyIcon
          tooltipTitle={t("DELETE")}
          onClick={!disableDelete ? () => handleDelete(row) : undefined}
          icon={<Delete className="text-gray-800" />}
          size="small"
        />
      )}
      {isAdded && copyRowOn && (
        <UnifiedButton
          onlyIcon
          tooltipTitle={t("DELETE")}
          icon={<Close className="text-gray-800" />}
          onClick={() => handleDelete(row, rowIndex)}
        />
      )}
      {ExtraRowActions && <ExtraRowActions row={row} />}
    </div>
  );
};

export default DefaultActionsRow;
