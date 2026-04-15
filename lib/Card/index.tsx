import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SimpleForm from "@/lib/CustomTable/modals/default/SimpleForm";
import { ButtonIcon, UnifiedButton } from "@/lib/Form/Button";
import Accordion from "@/lib/Accordion";

interface CardProps {
  row: any;
  columns: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  selectOptions?: { [key: string]: any };
  mobileFields?: string[];
  showExpandButton?: boolean;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  expandedComponent?: any;
}

const Card: React.FC<CardProps> = ({
  row,
  columns,
  onEdit,
  onDelete,
  selectOptions,
  mobileFields = [],
  showExpandButton = true,
  showEditButton = row.deleted,
  showDeleteButton = row.deleted,
  expandedComponent,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFileExpanded, setIsFileExpanded] = useState(false);

  // Reset expanded state when row changes (pagination)
  React.useEffect(() => {
    setIsExpanded(false);
  }, [row?.id]);

  // Ultra simple safety check
  if (!row || !columns || !Array.isArray(columns)) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <div className="text-gray-400 text-sm">No data available</div>
      </div>
    );
  }

  // Get fields to show - use mobileFields if provided, otherwise first 3 columns
  const fieldsToShow =
    mobileFields && mobileFields.length > 0
      ? mobileFields
      : columns
          .slice(0, 3)
          .map((col) => col.field)
          .filter((field) => field);

  // Simple function to get field value
  const getValue = (fieldName: string) => {
    if (!fieldName || !row) return "-";

    try {
      // Find the column definition to check for valueGetter
      const column = columns.find((col) => col.field === fieldName);

      let value;
      if (column?.valueGetter) {
        const keys = column.valueGetter.split(".");
        value = keys.reduce((current: any, key: any) => current?.[key], row);
      } else {
        value = row[fieldName];
      }

      if (value === null || value === undefined) return "-";
      if (typeof value === "object") return "[Object]";
      return String(value);
    } catch {
      return "-";
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      {!isExpanded && fieldsToShow.length > 0 && (
        <>
          <div className="flex pt-3 pb-8">
            <div className="flex bg-gray-200 rounded-full min-w-10 h-10 mx-3 mt-2" />
            <div className="w-[250px]">
              {fieldsToShow.map((field, index) => (
                <div key={index} className="flex flex-col">
                  <span
                    className={`${
                      index === 0
                        ? "text-gray-900 text-sm  "
                        : "text-gray-500 text-xs"
                    } font-medium leading-relaxed`}
                  >
                    {getValue(field)}
                  </span>
                </div>
              ))}
              <div className="flex pt-1">
                <span className="text-[10px] bg-gray-200 rounded-full py-1 px-3 text-gray-400 font-medium leading-relaxed">
                  {row.deleted ? "ΕΠΕΞΕΡΓΑΣΙΜΟ" : "ΜΗ ΕΠΕΞΕΡΓΑΣΙΜΟ"}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between ml-auto">
              {showEditButton && onEdit && (
                <ButtonIcon
                  onClick={() => onEdit(row)}
                  className=" text-gray-600 rounded-full transition-all duration-200"
                  title="Edit Record"
                >
                  <EditIcon fontSize="small" />
                </ButtonIcon>
              )}
              {showExpandButton && (
                <UnifiedButton
                  variant="none"
                  onClick={() => setIsExpanded(true)}
                  icon={<ExpandMoreIcon fontSize="small" />}
                />
              )}
            </div>
          </div>
          <hr className=" border-gray-200" />
        </>
      )}

      {isExpanded && showExpandButton && (
        <>
          <div className="px-4 pt-3">
            <div className="flex justify-end">
              {showDeleteButton && onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(row)}
                  className=" text-white bg-red-400 rounded-md p-2 flex items-center justify-center font-medium text-sm"
                  title="Delete Record"
                >
                  ΔΙΑΓΡΑΦΗ <DeleteIcon fontSize="small" />
                </button>
              )}
            </div>
            <SimpleForm
              columns={columns}
              data={row}
              disabled
              selectOptions={selectOptions}
            />
          </div>

          {expandedComponent && (
            <Accordion
              title="Αρχεία"
              isOpen={isFileExpanded}
              onClick={() => setIsFileExpanded((prev) => !prev)}
            >
              {expandedComponent({ parentId: row.id })}
            </Accordion>
          )}

          <div className="flex bg-white justify-center mb-2">
            <UnifiedButton
              variant="outlined"
              title="Λιγότερα"
              onClick={() => setIsExpanded(false)}
              icon={<ExpandLessIcon fontSize="small" />}
            />
            {/* <div
                     onClick={() => setIsExpanded(false)}
                     className="text-gray-900 border border-gray-300 rounded-md p-2 mx-2 w-full flex items-center justify-center font-medium text-sm"
                  >
                     <ExpandLessIcon fontSize="small" />
                     <span className="ml-1">Λιγότερα</span>
                  </div> */}
          </div>
        </>
      )}

      {(!showExpandButton || fieldsToShow.length === 0) && (
        <div className="px-4 py-3">
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
            <SimpleForm
              columns={columns}
              data={row}
              disabled
              selectOptions={selectOptions}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
