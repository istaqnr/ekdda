import { get, isNil, isNumber } from "lodash/fp";
import dayjs from "dayjs";
import { Column } from "./interfaces";

export const initializeDefaultValues = (columns: Column[], value?: any) =>
  columns?.reduce(
    (acc: Record<string, string | boolean | null>, curr: Column) => {
      if (
        curr?.type === "date" ||
        curr?.type === "select" ||
        curr?.type === "time"
      ) {
        acc[curr?.field] = value ?? null;
      } else if (curr?.type === "checkbox" || curr?.type === "boolean") {
        acc[curr?.field] = value ?? false;
      } else {
        acc[curr?.field] = value ?? "";
      }
      return acc;
    },
    {}
  );

export const initializeValidations = (columns: Column[]) =>
  columns?.reduce((acc: Record<string, any>, curr: Column) => {
    acc[curr?.field] = curr?.validation;
    return acc;
  }, {});

export const getInitialFieldValues = ({
  column,
  data,
  watch,
}: {
  column: Column;
  data: Record<string, any>;
  watch?: any;
}) => {
  let renderOption;
  let indeterminate;
  let minDate: string | undefined;
  let multiple;
  const { field, type, minDateField, value } = column || {};

  const initialValue = get(field, data) || value;

  if (type === "select") {
    const optionKey =
      get("valueGetter", column)?.split(".")?.pop() || "dscrTxt";
    renderOption = (option: any) => option[optionKey];
    multiple = get("multiple", column);
  }

  if (type === "file") {
    multiple = get("multiple", column);
  }

  if (type === "checkbox" || type === "boolean") {
    indeterminate = get("indeterminate", column);
  }

  if (type === "date") {
    minDate = get("minDate", column);

    if (minDate === "today") {
      minDate = dayjs().format("YYYY-MM-DD");
    }
    if (minDateField && typeof watch === "function") {
      const minDateFromOtherField = watch(minDateField);
      if (
        isNil(minDate) ||
        dayjs(minDateFromOtherField).isAfter(dayjs(minDate))
      ) {
        minDate = minDateFromOtherField;
      }
    }
  }

  return { initialValue, renderOption, minDate, indeterminate, multiple };
};

type FieldDescription = {
  spec?: {
    optional?: boolean;
    nullable?: boolean;
  };
};

export const getRequiredFieldsFromSchemaDescription = (
  description: Record<string, FieldDescription>
): Record<string, boolean> => {
  const requiredFields: Record<string, boolean> = {};

  for (const [fieldName, fieldInfo] of Object.entries(description)) {
    if (
      fieldInfo?.spec?.optional === false &&
      fieldInfo.spec?.nullable === false
    ) {
      requiredFields[fieldName] = true;
    }
  }

  return requiredFields;
};

export const getDefaultTitle = (modalProps: any, t: any) => {
  if (isNumber(modalProps?.row?.id)) {
    if (get("disabled", modalProps)) {
      return t("INDEX.VIEW_ENTRY");
    }

    return t("INDEX.EDIT_ENTRY");
  }

  return t("INDEX.CREATE_ENTRY");
};

export const getData = (responseData: any): any => {
  if (
    responseData &&
    typeof responseData === "object" &&
    !Array.isArray(responseData) &&
    Object.prototype.hasOwnProperty.call(responseData, "data")
  ) {
    return getData(responseData.data);
  }

  return !isNil(responseData) ? responseData : [];
};

export const convertArrayToObject = (array: [], keyName: string) => {
  const res: any = {};
  for (const it of array) {
    const key = get(it, keyName);
    if (key) {
      res[`${key}`] = it;
    }
  }
  return res;
};

export const reqWhen = (value: any | ((val: any) => any), t: any) => ({
  is: value,
  then: (schema: any) => schema.required(t("ERROR.FIELD_IS_REQUIRED")),
  otherwise: (schema: any) => schema,
});

export const encodeURIByParams = ({ ...attrs }) => {
  const URI = Object.keys(attrs)
    .filter((key) => attrs[key] || attrs[key] === 0)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(attrs[key])}`
    )
    .join("&");
  return URI;
};
