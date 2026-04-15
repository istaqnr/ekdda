import {
  TableCell,
  TableRow,
  IconButton,
  Checkbox,
  Tooltip,
  Collapse,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import get from "lodash/fp/get";
import { useGenParamsStore } from "@/store/genParamsStore";
import { useTableStore } from "@/store/tableStore";
import { Column } from "@/lib/interfaces";
import FormField from "@/lib/FormField";
import DefaultActionsRow from "./DefaultActionsRow";
import { formatValueByType } from "../utils/formatter";

const EditableTableRow = ({
  row,
  rowIndex,
  checkRowsOn,
  name,
  onRowAction,
  onView,
  onEdit,
  onDelete,
  onDownload,
  hasActions,
  fixedActions,
  fixedCheckbox,
  renderCell,
  editableFieldsOn,
  expandRowsOn,
  expandedComponent,
  copyRowOn,
  ExtraRowActions,
  uniqueCheck,
  handleDisableCheckbox = (row: any) => false,
  checkBoxTooltip = (row: any) => "",
  lineHeight = "lg",
  actionColSize,
  handleCopyRow,
  control,
  errors,
}: any) => {
  const { genParams } = useGenParamsStore();
  const visibleColumns = useTableStore.getState().visibleColumns[name];

  const {
    updatedFields,
    addUpdatedField,
    checkedRows,
    setCheckedRows,
    setSelectedRow,
    deletedRows,
    expandedRow,
    setExpandedRow,
  } = useTableStore();

  const isSelected = checkedRows.some((r) => r.id === row.id);
  const foundDeletedRow = deletedRows.find(
    (item) => item.id === row.id && !row.uuid
  );

  const handleCheckboxChange = (row: any) => {
    if (handleDisableCheckbox(row)) return;
    const isAlreadySelected = checkedRows.some((r) => r?.id === row.id);
    const updatedCheckedRows = isAlreadySelected
      ? checkedRows.filter((r) => r?.id !== row.id)
      : [...checkedRows, row];

    if (uniqueCheck) setCheckedRows(isAlreadySelected ? [] : [row]);
    else setCheckedRows(updatedCheckedRows);
  };

  // TODO remove all handle and use selectedRow
  const handleSelect = (row: any) => {
    onRowAction && onRowAction(row);
  };
  const handleView = (newRow: any) => {
    onView && onView(newRow);
  };

  const handleEdit = (newRow: any) => {
    onEdit && onEdit(newRow);
  };

  const handleDelete = (newRow: any) => {
    onDelete && onDelete(newRow);
  };

  const checkUniqueness = !!(
    uniqueCheck &&
    checkedRows.length > 0 &&
    !checkedRows.some((r) => r?.id === row.id)
  );

  const isExpanded = !!expandedComponent && expandedRow === row?.id;

  // Calculate the total number of columns for proper colspan
  const totalColumns =
    (checkRowsOn ? 1 : 0) +
    (expandRowsOn && expandedComponent ? 1 : 0) +
    (visibleColumns?.length || 0) +
    (hasActions ? 1 : 0);

  return (
    <>
      <TableRow
        selected={isSelected}
        sx={{
          ...(onRowAction && {
            cursor: "pointer",
          }),
          ...(foundDeletedRow && {
            border: "4px solid",
            borderColor: "red.400",
          }),
          "&:hover": {
            backgroundColor: "slate.100",
          },
        }}
        onClick={() => handleSelect(row)}
      >
        {checkRowsOn ? (
          <TableCell
            padding="checkbox"
            className={`${
              fixedCheckbox &&
              `sticky left-0 z-10 group-hover:bg-slate-100 ${
                isSelected ? "bg-[#e3f2fd]" : "bg-white"
              } before:absolute before:right-[-5px] before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-r before:from-black/5 before:to-transparent`
            }`}
          >
            <Tooltip title={checkBoxTooltip(row)}>
              <span>
                <Checkbox
                  color="primary"
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(row)}
                  onClick={(e) => e.stopPropagation()}
                  disabled={
                    handleDisableCheckbox(row) || checkUniqueness || copyRowOn
                  }
                />
              </span>
            </Tooltip>
          </TableCell>
        ) : null}
        {!!expandedComponent && expandRowsOn && (
          <TableCell padding="checkbox">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedRow(isExpanded ? null : row?.id);
              }}
            >
              {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}

        {visibleColumns?.map((column: Column, columnIndex: any) => {
          const { field, type, valueGetter } = column || {};

          const initialValue = get(field, row);
          const value =
            initialValue && typeof initialValue === "object"
              ? get(`${valueGetter}`, row)
              : initialValue ?? "";

          const renderCellValue =
            renderCell && renderCell({ column, row, value });
          const content = renderCellValue ?? formatValueByType(value, type);

          const fieldOnEditMode =
            editableFieldsOn &&
            updatedFields?.find(
              (updatedField: any) =>
                updatedField.column === column.field &&
                updatedField?.row?.id === row?.id
            );

          const options = get(field, genParams);

          return !fieldOnEditMode && !copyRowOn ? (
            <TableCell
              key={`${field}-${columnIndex}`}
              align={get("align", column) || "inherit"}
              className="overflow-hidden text-ellipsis whitespace-nowrap max-h-[none] min-h-[auto] py-4 px-2"
              sx={{
                width: column.width,
                maxWidth: column.width,
                minWidth: column.width,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              onClick={() => setSelectedRow(row)}
              onDoubleClick={() => {
                const editableField = {
                  column: column.field,
                  row,
                };
                editableFieldsOn &&
                  !foundDeletedRow &&
                  addUpdatedField(editableField);
              }}
            >
              {typeof content === "string" || typeof content === "number" ? (
                <Tooltip title={content}>
                  <span>{content}</span>
                </Tooltip>
              ) : (
                <span className="flex justify-center">{content}</span>
              )}
            </TableCell>
          ) : (
            <TableCell
              key={columnIndex}
              sx={{
                width: column.width,
                maxWidth: column.width,
                minWidth: column.width,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <FormField
                type={type}
                id={`tableRows.${rowIndex}.${field}`}
                name={`tableRows.${rowIndex}.${field}`}
                control={control}
                errors={errors}
                helperText={false}
                initialValue={initialValue}
                copyRowOn={copyRowOn}
                options={options}
              />
            </TableCell>
          );
        })}

        {hasActions && visibleColumns?.length > 0 && (
          <TableCell
            className={`${
              fixedActions &&
              `sticky right-0 ${isSelected ? "bg-[#e3f2fd]" : "bg-white"}`
            }  text-ellipsis whitespace-nowrap`}
            sx={{
              width: actionColSize,
            }}
          >
            <DefaultActionsRow
              row={row}
              rowIndex={rowIndex}
              handleView={onView && handleView}
              handleEdit={onEdit && handleEdit}
              handleDelete={onDelete && handleDelete}
              handleCopyRow={handleCopyRow}
              onDownload={onDownload}
              disableView={
                row?.permissions ? !row?.permissions?.canView : false
              }
              disableEdit={
                row?.permissions ? !row?.permissions?.canEdit : false
              }
              disableDelete={
                row?.permissions ? !row?.permissions?.canDelete : false
              }
              copyRowOn={copyRowOn}
              // onSubmit={handleSubmit(onSubmit)}
              editableFieldsOn={editableFieldsOn}
              ExtraRowActions={ExtraRowActions}
            />
          </TableCell>
        )}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell
            sx={{
              padding: 0,
              borderBottom: "none",
            }}
            colSpan={totalColumns}
            className="w-full bg-slate-100"
          >
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              {expandedComponent(row)}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default EditableTableRow;
