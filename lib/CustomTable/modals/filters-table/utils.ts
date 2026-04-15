import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import head from "lodash/fp/head";
import {
  _operatorOptions,
  _operatorOptionsBoolean,
  _operatorOptionsDate,
  _operatorOptionsNumber,
  _operatorOptionsSelect,
} from "@/lib/CustomTable/utils/filterOperators";
import { Column, IFilterItem } from "@/lib/interfaces";
import { T } from "@/lib/types/next-auth";

dayjs.extend(customParseFormat);

export const getOperatorList = (type: string, t: T) => {
  switch (type) {
    case "select":
      return _operatorOptionsSelect(t);
    case "boolean":
      return _operatorOptionsBoolean(t);
    case "date":
      return _operatorOptionsDate(t);
    case "number":
      return _operatorOptionsNumber(t);
    default:
      return _operatorOptions(t);
  }
};

const getValue = (item: any, found: any) => {
  if (dayjs.isDayjs(item)) {
    return item.format("YYYY-MM-DD");
  }
  const type = typeof item;
  if (type === "string" || type === "number" || type === "boolean") {
    return item;
  }
  if (type === "object") {
    const key = found?.valueGetter?.split?.(".")?.[1];
    if (key && item[key] != null) return item[key];
    // Handle boolean objects like {value: true, dscrTxt: 'YES'}
    if (item?.value != null && typeof item.value === "boolean")
      return item.value;
    return item ?? "";
  }
  return item ?? "";
};
interface InputData {
  [key: string]:
    | string
    | number
    | boolean
    | Date
    | { value?: string | number | boolean | Date; dscrTxt?: string };
}

const isStrictDate = (item: any): boolean => {
  if (dayjs.isDayjs(item)) return item.isValid();
  if (typeof item !== "string") return false;
  return dayjs(item, "YYYY-MM-DD", true).isValid();
};

export const processFilters = (
  data: InputData,
  columns: Column[]
): IFilterItem[] => {
  const resultMap: Record<string, IFilterItem & { value_to?: string }> = {};

  for (const [key, item] of Object.entries(data)) {
    let field = "";
    let type = "";
    if (key.includes("_operator")) {
      [field, type] = [key.replace("_operator", ""), "operator"];
    } else if (key.includes("_value_to")) {
      [field, type] = [key.replace("_value_to", ""), "value_to"];
    } else if (key.includes("_value")) {
      [field, type] = [key.replace("_value", ""), "value"];
    }

    if (!resultMap[field]) {
      resultMap[field] = { columnField: field, operatorValue: "", value: "" };
    }

    const columnsFound = columns?.find((c: any) => c.field === field);

    if (type === "operator") {
      // @ts-expect-error for the item.value type
      resultMap[field].operatorValue = item?.value || "";
    } else if (type === "value" || type === "value_to") {
      const rawValue = getValue(item, columnsFound);
      const value = typeof rawValue === "string" ? rawValue.trim() : rawValue;
      const formattedValue = isStrictDate(value)
        ? dayjs(value).format("YYYY-MM-DD")
        : value;
      resultMap[field][type] = formattedValue;
    }
  }
  // Finalizing 'between' values and filtering out empty ones
  const results = Object.values(resultMap)
    .map((record) => {
      if (
        record.operatorValue === "between" &&
        record.value &&
        record.value_to
      ) {
        record.value = `${record.value}|${record.value_to}`;
      }
      return record;
    })
    .filter((it) => it.value !== "" && it.operatorValue !== "");

  return results.map(({ operatorValue, columnField, value }: any) => {
    const columnsFound = columns?.find((c: any) => c.field === columnField);

    // Handle boolean special case (isTrue/isFalse -> is)
    if (value !== "" && value !== undefined && typeof value === "boolean") {
      const newValue = value === true ? "isTrue" : "isFalse";
      return {
        columnField: columnsFound?.valueGetter || columnField,
        operatorValue: newValue,
        value,
      };
    }
    // here is the returned value
    return {
      columnField: columnsFound?.valueGetter || columnField,
      operatorValue,
      value,
    };
  });
};

const transformKeys = (obj: any) =>
  Object.keys(obj).reduce((acc: any, key) => {
    const newKey = key.split(".")[0]; // take everything before the first dot
    acc[newKey] = obj[key];
    return acc;
  }, {});

export const initializeDefaultFilterValues = ({
  modalProps,
  filters: storedFilters,
  t,
}: any) => {
  const operatorOptions = _operatorOptions(t);
  const operatorOptionsDate = _operatorOptionsDate(t);
  const operatorOptionsSelect = _operatorOptionsSelect(t);
  const operatorOptionsBoolean = _operatorOptionsBoolean(t);
  const operatorOptionsNumber = _operatorOptionsNumber(t);

  return modalProps.columns?.reduce(
    (acc: Record<string, any>, curr: Column) => {
      const { field, type } = curr || {};

      const filters = transformKeys(storedFilters);

      const value = filters?.[field]?.value;
      const fieldFilter = filters?.[field]?.columnField.split(".")[1];

      let initialValue = value ?? "";

      if (type === "select") {
        const foundData =
          value &&
          modalProps?.[field]?.data?.find(
            (it: any) => it[fieldFilter] === value
          );
        initialValue = foundData;
      }
      if (type === "date") {
        initialValue = value || "";
      }

      if (
        type === "date" &&
        filters?.[field]?.operatorValue === "between" &&
        typeof value === "string"
      ) {
        const [from, to] = value.split("|");
        initialValue = from;
        acc[`${field}_value_to`] = to;
      }

      let defaultOperatorValue;

      const getOperatorOptions = () => {
        switch (type) {
          case "select":
            return operatorOptionsSelect;
          case "boolean":
            return operatorOptionsBoolean;
          case "date":
            return operatorOptionsDate;
          case "number":
            return operatorOptionsNumber;
          default:
            return operatorOptions;
        }
      };

      const operatorOptionsForType = getOperatorOptions();
      // Handle boolean special case (isTrue/isFalse -> is)
      if (
        type === "boolean" &&
        (filters?.[field]?.operatorValue === "isTrue" ||
          filters?.[field]?.operatorValue === "isFalse")
      ) {
        defaultOperatorValue = operatorOptionsForType?.find(
          (opt: any) => opt.value === "is"
        );
      } else {
        defaultOperatorValue = operatorOptionsForType?.find(
          (it: any) => it.value === filters?.[field]?.operatorValue
        );
      }

      const initialOperatorValue = head(operatorOptionsForType);
      acc[`${field}_operator`] = defaultOperatorValue ?? initialOperatorValue;
      acc[`${field}_value`] = initialValue;
      return acc;
    },
    {}
  );
};
