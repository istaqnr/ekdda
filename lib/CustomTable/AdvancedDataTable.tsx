import React, { useState, useRef, useEffect, FC, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import get from "lodash/get";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useTranslations } from "next-intl";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useFilterSortStore from "@/store/filterSortStore";
import { useTableStore } from "@/store/tableStore";
import { useGlobalStore } from "@/store/globalStore";

import Card from "@/lib/Card";
import { TableHeader } from "./components/TableHeader";
import { TableToolbar } from "./components/TableToolbar";
import TableLoadingAndErrorHandling from "./components/TableLoadingAndErrorHandling";
import EditableTableRow from "./components/EditableTableRow";
import EditableFieldsActionButtons from "./components/EditableActionButtons";
import SummariesRow from "./components/SummariesRow";
import { Column } from "../interfaces";
import { initializeValidations } from "../utils";
import useApiFilterSort from "../hooks/useApiFilterSort";
import { useTableScroll } from "../hooks/useTableScroll/useTableScroll";

interface AdvancedDataGridProps<T extends Record<string, any>> {
  name: string;
  title?: any;
  columns: Column[];
  rows: T[];
  summaries?: any;
  pageSize?: number;
  rowCount?: number;
  onPageChange?: (newPage: number) => void;
  onPageSizeChange?: (newPageSize: number) => void;
  isLoading?: boolean;
  error?: any;
  // Peripheral Actions
  onAdd?: (newRow: T) => any;
  onView?: (row: T) => any;
  onEdit?: (row: T) => any;
  onDelete?: (row: T) => any;
  onDownload?: (row: T) => any;
  onRowAction?: (row: T) => any;
  fixedActions?: boolean;
  extraToolbarActions?: React.ReactNode;
  ExtraRowActions?: React.ComponentType<{ row: T }>;
  actionColSize?: string;
  // Sorting
  onSortChange?: (field: string) => void;
  // Checkbox
  checkRowsOn?: boolean;
  handleDisableCheckbox?: (row: any) => void;
  uniqueCheck?: boolean;
  checkBoxTooltip?: (row: any) => string;
  // Columns Visibility
  onColumnsVisibility?: () => any;
  onFilters?: () => void | undefined | boolean;
  columnsToolbar?: boolean;
  expandedComponent?: any;
  expandRowsOn?: boolean;
  // Pagination props
  page?: number;
  totalPages?: number;
  // Infinite Scrolling props
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  // Mode selection
  mode?: "pagination" | "infinite";
  reverseColorToolbar?: boolean;
  headerBgColor?: string;
  headerTextColor?: string;
  renderCell?(t: any): any;
  resizable?: boolean;
  onExportClicked?(columns: any): void;
  // Edit per field
  editableFieldsOn?: boolean;
  translationSource?: string;
  withWrapper?: boolean;
  mobileFields?: any[];
  enableMobileCards?: boolean;
  lineHeight?: "sm" | "md" | "lg";
}

interface AdvancedDataTableWrapperProps {
  children: React.ReactNode;
  withWrapper?: boolean;
}

const AdvancedDataTableWrapper: React.FC<AdvancedDataTableWrapperProps> = ({
  children,
  withWrapper,
}) =>
  withWrapper ? (
    <Paper elevation={3} className="w-full">
      {children}
    </Paper>
  ) : (
    <div className="w-full">{children}</div>
  );

const AdvancedDataTable = <T extends Record<string, any>>({
  name,
  title,
  columns,
  rows,
  summaries,
  pageSize,
  rowCount,
  page,
  totalPages,
  onPageChange,
  onPageSizeChange,
  isLoading,
  error,
  onAdd,
  onView,
  onEdit,
  onDelete,
  onDownload,
  onRowAction,
  onSortChange,
  checkRowsOn,
  expandRowsOn,
  onColumnsVisibility,
  onFilters,
  expandedComponent,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  mode,
  reverseColorToolbar,
  headerBgColor,
  headerTextColor,
  columnsToolbar,
  renderCell,
  fixedActions,
  resizable = true,
  onExportClicked,
  translationSource,
  editableFieldsOn,
  ExtraRowActions,
  uniqueCheck,
  withWrapper = true,
  extraToolbarActions,
  handleDisableCheckbox,
  checkBoxTooltip,
  actionColSize = "130px",
  enableMobileCards = false,
  mobileFields,
  lineHeight = "lg",
}: AdvancedDataGridProps<T>) => {
  const t = useTranslations("INDEX");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { toggleSort } = useApiFilterSort({ queryKey: name });
  const { filters, sorts, removeFilter } = useFilterSortStore({
    queryKey: name,
  });
  const { openModal, closeModal } = useGlobalStore();
  const { setDeletedRows, checkedRows, setCheckedRows } = useTableStore();

  const visibleColumns = useTableStore.getState().visibleColumns[name];
  const setVisibleColumns = useTableStore.getState().setVisibleColumns;

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  // console.log(
  //   '%ccreatedRows: %o \ndeletedRows: %o \nupdatedRows: %o',
  //   'color: lightgreen; font-weight: bold;',
  //   createdRows,
  //   deletedRows,
  //   updatedRows,
  // );

  // For react-hook-form Table with Validations functionality
  const tableRows = rows?.map((row, index) => {
    const rowValues = {} as Record<string, any>;
    columns.forEach((col) => {
      const value = get(row, col.field);
      rowValues[col.field] = value || "";
    });
    return { ...rowValues, id: row.id };
  });

  const schema = useMemo(
    () =>
      yup.object({
        tableRows: yup
          .array()
          .of(yup.object().shape(initializeValidations(columns))),
      }),
    [columns]
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: { tableRows },
    resolver: yupResolver(schema),
    // shouldUnregister: true,
  });

  const { replace, remove, append, insert, fields, update } = useFieldArray({
    control,
    name: "tableRows",
  });

  const validationErrors = useMemo(() => {
    const tableRowErrors = (errors?.tableRows as any) || [];
    return fields?.map((_, index) => tableRowErrors[index] ?? null);
  }, [errors, fields]);

  const handleCreateRow = (row: any) => {
    const newRowObject = { isCreated: true };
    append(newRowObject);
  };

  const handleCopyRow = (row: any, rowIndex: number) => {
    const newRowObject = { ...row, isCopied: true };
    insert(rowIndex, newRowObject);
  };

  useEffect(() => {
    const initialVisibleColumns = columns.filter((col) => !col?.initialHidden);
    setVisibleColumns(name, initialVisibleColumns);
  }, []);

  useEffect(() => {
    setExpandedRow(null);
  }, [rows]);

  // Clear checked rows when page changes
  useEffect(() => {
    setCheckedRows([]);
  }, [name]);

  const { fixActions, fixCheckbox, tableContainerRef } = useTableScroll({
    fixedActions,
  });

  const handleCheck = (checked: boolean) => {
    if (checked) {
      setCheckedRows(rows);
    } else {
      setCheckedRows([]);
    }
  };

  const hasActions = !!(
    onAdd ||
    onFilters ||
    onView ||
    onEdit ||
    onDelete ||
    onDownload ||
    ExtraRowActions
  );

  const handleSortChange = (column: any) => {
    const fieldName = get(column, "field");
    const columnField = get(column, "valueGetter", fieldName);
    toggleSort({ columnField });
    onSortChange && onSortChange(column);
  };

  const tableRef = useRef<HTMLDivElement>(null);

  // TODO  infinite scroll functionality
  // useTableInfiniteScroll(!!hasNextPage, !!isFetchingNextPage, fetchNextPage, tableRef, 'infinite');
  // const validations = modalProps?.columns?.reduce((acc: Record<string, any>, curr: Column) => {
  //   acc[curr.field] = curr.validation;
  //   return acc;
  // }, {});

  const handleDeleteEditableRow = (row: any) => {
    const modalProps: any = {
      title: "Are you sure you want to delete this row?",
      onConfirm: () => {
        setDeletedRows(row);
        closeModal();
      },
    };
    openModal("CONFIRM", modalProps);
  };

  useEffect(() => {
    replace(tableRows);
  }, [columns, rows]);

  /* Key forces React to treat the component as a completely new instance by changing the key on every render. This ensures the table re-renders from scratch, which is why the layout and columns are correctly re-calculated. */
  const isFirefox =
    typeof navigator !== "undefined" && /firefox/i.test(navigator.userAgent);
  const [firefoxKey, setFirefoxKey] = useState<any>(Date.now());

  useEffect(() => {
    if (isFirefox) setFirefoxKey(Date.now());
  }, [setFirefoxKey]);

  const labelDisplayedRows = ({ from, to, count }: any) =>
    `${from}-${to} ${t("OF")} ${count} (${t("PAGE")} ${(page ?? 0) + 1} ${t(
      "OF"
    )} ${totalPages})`;

  const handleUndoCheckedRows = () => {
    const { checkedRows } = useTableStore.getState();
    const cdSet = new Set(checkedRows.map((r: any) => r.cd));
    const rowsByCd = new Map(tableRows.map((r: any) => [r?.cd, r]));

    fields.forEach((field, index) => {
      const fieldId = (field as any).cd || (field as any).id;
      if (!field.isCopied && cdSet.has(fieldId)) {
        const found = rowsByCd.get(fieldId);
        if (found) {
          clearErrors(`tableRows.${index}`);
          update(index, found);
        }
      }
    });
  };

  const finalRows = editableFieldsOn ? fields : rows;

  return (
    <AdvancedDataTableWrapper withWrapper={isMobile ? false : withWrapper}>
      <div className="flex w-full justify-between">
        {editableFieldsOn ? (
          <EditableFieldsActionButtons
            columns={columns}
            errors={errors}
            validationErrors={validationErrors}
            handleCreateRow={handleCreateRow}
            handleSubmit={handleSubmit}
            handleUndoCheckedRows={handleUndoCheckedRows}
          />
        ) : (
          <div />
        )}
      </div>
      {(columnsToolbar ||
        !!onAdd ||
        !!onFilters ||
        !!extraToolbarActions ||
        !!onExportClicked) && (
        <TableToolbar
          name={name}
          filters={filters}
          columns={columns}
          title={title}
          onAdd={onAdd}
          onFilters={onFilters}
          onColumnsVisibility={onColumnsVisibility}
          onRemoveFilter={removeFilter}
          reverseColorToolbar={reverseColorToolbar}
          columnsToolbar={columnsToolbar}
          onClickExportGridBtn={
            onExportClicked ? () => onExportClicked(visibleColumns) : null
          }
          translationSource={translationSource}
          extraToolbarActions={extraToolbarActions}
        />
      )}

      {/* Mobile Card View */}
      {enableMobileCards && isMobile ? (
        <div className="flex flex-col gap-4">
          {!isLoading && !error && finalRows && finalRows.length > 0 ? (
            finalRows.map((row, rowIndex) => {
              if (!row || typeof row !== "object") return null;
              const isAdded = row?.isCreated || row?.isCopied;

              const editableRowDelete = isAdded
                ? () => remove(rowIndex)
                : editableFieldsOn
                ? handleDeleteEditableRow
                : onDelete;

              return (
                <Card
                  key={`${row?.id}-${rowIndex}`}
                  row={row}
                  columns={columns}
                  mobileFields={mobileFields}
                  onEdit={!isAdded ? onEdit : undefined}
                  onDelete={editableRowDelete}
                  selectOptions={{}}
                  expandedComponent={expandedComponent}
                  // showEditButton={!!onEdit && !isAdded}
                  // showDeleteButton={!!editableRowDelete}
                />
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>
                {isLoading
                  ? "Φόρτωση..."
                  : error
                  ? "Σφάλμα φόρτωσης"
                  : !finalRows || finalRows.length === 0
                  ? "Δεν υπάρχουν δεδομένα"
                  : "Φόρτωση δεδομένων..."}
              </p>
            </div>
          )}
        </div>
      ) : (
        <TableContainer
          component={Paper}
          ref={tableContainerRef}
          className="transition duration-300"
        >
          <Table
            sx={{
              overflowX: {
                xs: "auto",
                md: "auto",
                lg: "visible",
              },
              paddingRight: {
                xs: 2,
                sm: 2,
                md: 3,
                lg: 0,
              },
              maxWidth: "100%",
              tableLayout: {
                xs: "fixed",
                md: "fixed",
                lg: "fixed",
              },
            }}
          >
            <TableHeader
              key={isFirefox ? firefoxKey : "table-header"}
              visibleColumns={visibleColumns}
              setVisibleColumns={(cols) => setVisibleColumns(name, cols)}
              rows={finalRows}
              sorts={sorts}
              handleCheck={checkRowsOn && handleCheck}
              hasExpandedComponent={expandRowsOn}
              onSortChange={handleSortChange}
              hasActions={hasActions}
              fixedActions={fixActions}
              fixedCheckbox={fixCheckbox && checkRowsOn}
              resizable={resizable}
              translationSource={translationSource}
              actionColSize={actionColSize}
              reverseColorToolbar={reverseColorToolbar}
              headerBgColor={headerBgColor}
              headerTextColor={headerTextColor}
            />
            <TableBody>
              {!isLoading && !error && finalRows?.length > 0 ? (
                finalRows.map((row, rowIndex) => {
                  if (!row || typeof row !== "object") return null;
                  const isRowExpanded = expandedRow === rowIndex;
                  const isAdded = row?.isCreated || row?.isCopied;

                  const editableRowDelete = isAdded
                    ? () => remove(rowIndex)
                    : editableFieldsOn
                    ? handleDeleteEditableRow
                    : onDelete;

                  return (
                    <EditableTableRow
                      key={row?.id}
                      columns={columns}
                      setExpandedRow={setExpandedRow}
                      row={row}
                      rowIndex={rowIndex}
                      checkRowsOn={checkRowsOn}
                      name={name}
                      onRowAction={onRowAction}
                      onView={!isAdded ? onView : null}
                      onEdit={!isAdded ? onEdit : null}
                      onDelete={editableRowDelete}
                      onDownload={onDownload}
                      expandRowsOn={expandRowsOn}
                      expandedComponent={expandedComponent}
                      isRowExpanded={isRowExpanded}
                      hasActions={hasActions}
                      fixedActions={fixActions}
                      fixedCheckbox={fixCheckbox && checkRowsOn}
                      renderCell={renderCell}
                      uniqueCheck={uniqueCheck}
                      handleDisableCheckbox={handleDisableCheckbox}
                      lineHeight={lineHeight}
                      checkBoxTooltip={checkBoxTooltip}
                      editableFieldsOn={editableFieldsOn}
                      ExtraRowActions={ExtraRowActions}
                      copyRowOn={isAdded}
                      actionColSize={actionColSize}
                      handleCopyRow={handleCopyRow}
                      control={control}
                      errors={errors}
                    />
                  );
                })
              ) : (
                <TableLoadingAndErrorHandling
                  visibleColumns={visibleColumns}
                  checkRowsOn={checkRowsOn}
                  hasExpandedComponent={expandRowsOn}
                  isLoading={isLoading}
                  error={error}
                />
              )}
              {summaries && (
                <SummariesRow
                  visibleColumns={visibleColumns}
                  summaries={summaries}
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {mode === "infinite" && (
        <div
          ref={tableRef}
          className="flex p-5 w-full items-center justify-center"
        >
          {isLoading || isFetchingNextPage ? (
            <CircularProgress />
          ) : hasNextPage ? (
            <IconButton
              aria-label="load more"
              size="large"
              onClick={() => {
                fetchNextPage && fetchNextPage();
                onPageChange && onPageChange((page ?? 0) + 1);
              }}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          ) : null}
        </div>
      )}
      {mode === "pagination" && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage={t("ROWS_PER_PAGE")}
          component="div"
          count={rowCount || 0}
          rowsPerPage={pageSize || 0}
          page={page || 0}
          onPageChange={(_, newPage) => onPageChange && onPageChange(newPage)}
          onRowsPerPageChange={(event) => {
            const newPageSize = parseInt(event.target.value, 10);
            onPageSizeChange && onPageSizeChange(newPageSize);
          }}
          labelDisplayedRows={labelDisplayedRows}
          slotProps={{
            select: {
              inputProps: {
                "aria-label": "rows per page",
                "aria-labelledby": "rowsPage",
              },
              id: "rowsPage",
            },
          }}
          ActionsComponent={(props) => {
            const totalPages =
              rowCount && pageSize ? Math.ceil(rowCount / pageSize) : 0;
            const currentPage = page != null ? page : 0;

            return (
              <div className="flex items-center gap-1">
                {/* Mobile: Show only prev/next buttons */}
                <div className="flex items-center md:hidden">
                  <IconButton
                    onClick={(event) =>
                      props.onPageChange(event, currentPage - 1)
                    }
                    disabled={currentPage === 0}
                    aria-label="previous page"
                    size="small"
                    sx={{ color: currentPage === 0 ? "grey" : "black" }}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <span className="text-sm text-gray-600 px-2">
                    {currentPage + 1} / {totalPages}
                  </span>
                  <IconButton
                    onClick={(event) =>
                      props.onPageChange(event, currentPage + 1)
                    }
                    disabled={currentPage >= totalPages - 1}
                    aria-label="next page"
                    size="small"
                    sx={{
                      color: currentPage >= totalPages - 1 ? "grey" : "black",
                    }}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </div>

                {/* Desktop: Show all pagination controls */}
                <div className="hidden md:flex items-center">
                  <IconButton
                    onClick={(event) => props.onPageChange(event, 0)}
                    disabled={currentPage === 0}
                    aria-label="first page"
                    size="small"
                    sx={{ color: currentPage === 0 ? "grey" : "black" }}
                  >
                    <FirstPageRoundedIcon />
                  </IconButton>
                  <IconButton
                    onClick={(event) =>
                      props.onPageChange(event, currentPage - 1)
                    }
                    disabled={currentPage === 0}
                    aria-label="previous page"
                    size="small"
                    sx={{ color: currentPage === 0 ? "grey" : "black" }}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton
                    onClick={(event) =>
                      props.onPageChange(event, currentPage + 1)
                    }
                    disabled={currentPage >= totalPages - 1}
                    aria-label="next page"
                    size="small"
                    sx={{
                      color: currentPage >= totalPages - 1 ? "grey" : "black",
                    }}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                  <IconButton
                    onClick={(event) =>
                      props.onPageChange(event, totalPages - 1)
                    }
                    disabled={currentPage >= totalPages - 1}
                    aria-label="last page"
                    size="small"
                    sx={{
                      color: currentPage >= totalPages - 1 ? "grey" : "black",
                    }}
                  >
                    <LastPageRoundedIcon />
                  </IconButton>
                </div>
              </div>
            );
          }}
          sx={{
            // this is for WAVE
            "& .MuiSelect-nativeInput": {
              display: "none",
            },
            // Mobile responsive styling
            "& .MuiTablePagination-toolbar": {
              paddingLeft: { xs: 1, sm: 2 },
              paddingRight: { xs: 1, sm: 2 },
              flexWrap: { xs: "wrap", sm: "nowrap" },
              minHeight: { xs: "auto", sm: "52px" },
            },
            "& .MuiTablePagination-selectLabel": {
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            },
            "& .MuiTablePagination-displayedRows": {
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            },
            "& .MuiTablePagination-select": {
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            },
          }}
        />
      )}
    </AdvancedDataTableWrapper>
  );
};

export default AdvancedDataTable;
