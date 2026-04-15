import { Chip, chipClasses } from "@mui/material";
import { get } from "lodash";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { convertArrayToObject } from "@/lib/utils";
import { _operatorLabels } from "../utils/filterOperators"; // Updated import

const FilterList = ({ filters, columns, onRemoveFilter }: any) => {
  const t = useTranslations();
  const operatorLabels = _operatorLabels(t);

  const columnsObject = useMemo(
    () => convertArrayToObject(columns, "field"),
    [columns]
  );

  return (
    <div className="flex">
      {filters?.length > 0 &&
        filters.map((filter: any, index: number) => {
          const fieldName = get(filter, "columnField");
          const operatorName = get(filter, "operatorValue");
          const fieldValue = get(filter, "value", "");
          const operLabel = get(operatorLabels, operatorName, operatorName); // Use translated operator label

          const fieldLabel = fieldName.includes(".")
            ? get(
                columnsObject,
                `${fieldName.split(".")[0]}.headerName`,
                fieldName
              )
            : get(columnsObject, `${fieldName}.headerName`, fieldName);

          return (
            <Chip
              key={index}
              variant="filled"
              label={`${fieldLabel} ${operLabel} ${fieldValue}`}
              deleteIcon={<HighlightOffIcon />}
              sx={{
                background: "#1976D2",
                color: "#ffffe1",
                marginLeft: "5px",
                fontSize: "12px",
                fontStyle: "italic",
                [`& .${chipClasses.deleteIcon}`]: {
                  color: "white",
                  transition: "all 0.3s",
                  "&:hover": {
                    scale: "1.1",
                    color: "white",
                    transition: "all 0.3s",
                  },
                },
              }}
              onDelete={() => onRemoveFilter(filter.columnField)}
            />
          );
        })}
    </div>
  );
};

export default FilterList;
