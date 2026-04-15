import React, { useState, useRef, useEffect, useMemo } from "react";
import Paper from "@mui/material/Paper";
import get from "lodash/get";
import { useTranslations } from "next-intl";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useApiFilterSort from "@/lib/hooks/useApiFilterSort";
import useFilterSortStore from "@/store/filterSortStore";
import { useTableStore } from "@/store/tableStore";
import { useGlobalStore } from "@/store/globalStore";
import { useTableScroll } from "@/lib/hooks/useTableScroll/useTableScroll";
import Card from "@/lib/Card";
import { TableHeader } from "./components/TableHeader";
import { TableToolbar } from "./components/TableToolbar";
import TableLoadingAndErrorHandling from "./components/TableLoadingAndErrorHandling";
import EditableTableRow from "./components/EditableTableRow";
import EditableFieldsActionButtons from "./components/EditableActionButtons";
import SummariesRow from "./components/SummariesRow";
import { Column } from "../interfaces";
import { initializeValidations } from "../utils";
import InfiniteTablePagination from "./components/InfiniteTablePagination";
import TablePagination from "./components/TablePagination";

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

const CustomTable = <T extends Record<string, any>>({
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

  const { visibleColumns, setVisibleColumns } = useTableStore((state: any) => ({
    visibleColumns: state.visibleColumns[name],
    setVisibleColumns: state.setVisibleColumns,
  }));

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
    <AdvancedDataTableWrapper withWrapper={withWrapper}>
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
        <div
          ref={tableContainerRef}
          className="transition duration-300 w-full overflow-auto bg-white shadow-md rounded"
        >
          <table
            className="w-full min-w-full border-collapse"
            style={{
              tableLayout: "auto", // Responsive layout for small/medium screens
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
              ExtraRowActions={ExtraRowActions}
            />
            <tbody>
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
                      key={row.id}
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
                      expandedComponent={expandedComponent}
                      isRowExpanded={isRowExpanded}
                      hasActions={hasActions}
                      fixedActions={fixActions}
                      fixedCheckbox={fixCheckbox && checkRowsOn}
                      renderCell={renderCell}
                      uniqueCheck={uniqueCheck}
                      handleDisableCheckbox={handleDisableCheckbox}
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
            </tbody>
          </table>
        </div>
      )}
      {mode === "pagination" && (
        <TablePagination
          pageSize={pageSize}
          rowCount={rowCount}
          page={page}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          totalPages={totalPages}
        />
      )}
      {/* Not yet implemented */}
      {mode === "infinite" && (
        <InfiniteTablePagination
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          onPageChange={onPageChange}
          page={page}
        />
      )}
    </AdvancedDataTableWrapper>
  );
};

export default CustomTable;
