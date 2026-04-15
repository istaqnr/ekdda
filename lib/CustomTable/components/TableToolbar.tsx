import React, { useMemo } from "react";
import { Toolbar, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ExportIcon from "@mui/icons-material/FileDownloadOutlined";

import { isFunction } from "lodash";
import { useTranslations } from "next-intl";
import { useGlobalStore } from "@/store/globalStore";

import { UnifiedButton } from "@/lib/Form/Button";
import FilterList from "./FilterList";

interface TableToolbarProps {
  title?: string;
  name: string;
  onAdd: any;
  onColumnsVisibility?: any;
  onFilters?: any;
  reverseColorToolbar?: boolean;
  columnsToolbar?: boolean;
  onRemoveFilter(columnField: string): any;
  filters: any;
  columns: any;
  onClickExportGridBtn?: (() => void) | null;
  translationSource?: string;
  extraToolbarActions?: React.ReactNode;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  name,
  title,
  onAdd,
  onFilters,
  onColumnsVisibility,
  reverseColorToolbar = false,
  columnsToolbar,
  onRemoveFilter,
  onClickExportGridBtn,
  filters: filtersProp,
  columns, // helper to get headerName
  translationSource,
  extraToolbarActions,
}) => {
  const filters = useMemo(
    () => Object.values(filtersProp || []),
    [filtersProp]
  );
  const queryKey = name;
  const { openModal, closeModal } = useGlobalStore();
  const t = useTranslations("INDEX");

  const onColumnsVisibilityDefault = () => {
    const modalProps: any = {
      columns,
      translationSource,
      urlKey: name,
      onConfirm: () => closeModal(),
    };
    openModal("COLUMNS_VISIBILITY", modalProps);
  };

  const onFiltersDefault = () => {
    const modalProps: any = {
      columns,
      queryKey,
      onConfirm: () => closeModal(),
    };
    openModal("FILTERS", modalProps);
  };

  return (
    <Toolbar className="flex w-full flex-col items-start pb-5 md:pb-0">
      <div
        className={`${
          reverseColorToolbar ? "bg-[#112D63]" : "bg-white"
        } p-2 rounded flex w-full justify-start md:justify-center`}
      >
        <div className="flex items-center">
          {title && (
            <Typography variant="h6" component="div" sx={{ flex: "1 1 100%" }}>
              {title}
            </Typography>
          )}
        </div>
        <div
          className={`flex flex-col ${
            reverseColorToolbar ? "text-white" : ""
          } md:flex-row items-start md:items-center gap-2 md:gap-3`}
        >
          {isFunction(onAdd) && (
            <UnifiedButton
              fullWidth
              size="small"
              tooltipTitle={t("ADD_NEW_ROW")}
              onClick={onAdd}
              icon={<AddIcon />}
            />
          )}
          {isFunction(onFilters) && (
            <UnifiedButton
              fullWidth
              size="small"
              tooltipTitle={t("FILTER")}
              onClick={onFilters ?? onFiltersDefault}
              icon={<FilterListIcon />}
            />
          )}
          {columnsToolbar && (
            <UnifiedButton
              fullWidth
              size="small"
              tooltipTitle={t("VIEW_COL")}
              onClick={onColumnsVisibility ?? onColumnsVisibilityDefault}
              icon={<ViewColumnIcon />}
            />
          )}
        </div>
        {extraToolbarActions}
        <div className="ml-auto">
          {onClickExportGridBtn && (
            <UnifiedButton
              size="small"
              variant="none"
              fullWidth
              onlyIcon
              tooltipTitle={t("EXPORT_GRID")}
              onClick={onClickExportGridBtn}
              icon={<ExportIcon />}
            />
          )}
        </div>
      </div>
      <FilterList
        filters={filters}
        columns={columns}
        onRemoveFilter={onRemoveFilter}
      />
    </Toolbar>
  );
};
