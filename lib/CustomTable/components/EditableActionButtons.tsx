import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { FieldError } from "react-hook-form";
import { useTableStore } from "@/store/tableStore";
import { Column } from "@/lib/interfaces";
import { UnifiedButton } from "../../Form/Button";

const EditableFieldsActionButtons = ({
  columns,
  disabled,
  handleCreateRow,
  handleSubmit,
  handleUndoCheckedRows,
  validationErrors,
}: any) => {
  const {
    updatedFields,
    undoCheckedRow,
    deletedRows,
    createdRows,
    checkedRows,
    updatedRows,
  } = useTableStore();

  const hasValidationErrors = validationErrors?.some(
    (error: FieldError) => error !== null
  );
  const onSubmit = async () => {
    const payload = {
      created: createdRows,
      deleted: deletedRows,
      updated: updatedRows,
    };
    // await mainApi.post(`/dddy/backend/api/v1/cmn-color/massCrud`, payload);
  };

  return (
    <div>
      <div className="flex m-3">
        <UnifiedButton
          title="CREATE"
          size="medium"
          variant="primary"
          onClick={handleCreateRow}
          disabled={disabled}
        />

        <UnifiedButton
          title="SAVE"
          size="medium"
          variant="primary"
          className="bg-primary  w-[100px] my-auto"
          onClick={handleSubmit(onSubmit)}
          disabled={false}
        />
        <UnifiedButton
          title="UNDO"
          size="medium"
          variant="primary"
          onClick={() => {
            handleUndoCheckedRows();
            undoCheckedRow(checkedRows);
          }}
          disabled={
            !(
              (updatedFields?.length > 0 || deletedRows?.length > 0) &&
              checkedRows?.length > 0
            )
          }
        />
      </div>

      {/* Validation Errors Display */}
      {hasValidationErrors && (
        <div className="mx-3 bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-semibold mb-3">
            Please fix the following validation errors:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {validationErrors.map((rowError: any, rowIndex: number) => {
              if (!rowError) return null;

              return (
                <div
                  key={rowIndex}
                  className="bg-white rounded border border-red-100 p-3"
                >
                  <h4 className="text-red-700 font-medium mb-2">
                    Row {rowIndex + 1}
                  </h4>
                  <ul className="space-y-1">
                    {Object.entries(rowError).map(
                      ([fieldName, error]: [string, any]) => {
                        const column = columns.find(
                          (col: Column) => col.field === fieldName
                        );
                        const columnLabel = column?.headerName || fieldName;

                        return (
                          <li
                            key={fieldName}
                            className="flex items-start text-sm"
                          >
                            <FiberManualRecordIcon
                              className="text-red-500 text-xs mt-1 mr-2 flex-shrink-0"
                              style={{ fontSize: "8px" }}
                            />
                            <span>
                              <strong>{columnLabel}:</strong>{" "}
                              {error?.message || error}
                            </span>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Changes Summary */}
      {!hasValidationErrors &&
        (createdRows?.length > 0 ||
          updatedRows?.length > 0 ||
          deletedRows?.length > 0) && (
          <div className="mx-3 bg-blue-50 border border-blue-200 rounded-md p-3">
            <div className="flex items-center gap-4 text-sm text-blue-700">
              {createdRows?.length > 0 && (
                <span>➕ {createdRows?.length} row(s) to create</span>
              )}
              {updatedRows?.length > 0 && (
                <span>📝 {updatedRows?.length} row(s) to update</span>
              )}
              {deletedRows?.length > 0 && (
                <span>🗑️ {deletedRows?.length} row(s) to delete</span>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default EditableFieldsActionButtons;
