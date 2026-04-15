import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { get, isNil } from "lodash";
import CheckCircle from "@mui/icons-material/CheckCircle";

dayjs.extend(customParseFormat);

export const DATE_FORMAT = "DD-MM-YYYY";
export const DATE_TIME_FORMAT = "DD-MM-YYYY HH:mm";
export const TIME_FORMAT = "HH:mm:ss";

const parseDateValue = (dateValue: any) => {
   if (!dateValue) return null;

   // If it's already a dayjs object, return it
   if (dayjs.isDayjs(dateValue)) return dateValue;

   // Try to parse as YYYY-MM-DD format first (backend format)
   const parsedDate = dayjs(dateValue, "YYYY-MM-DD", true);
   if (parsedDate.isValid()) return parsedDate;

   // Fallback to default parsing
   return dayjs(dateValue);
};

export const formatValueByType = (value: any, _type?: any) => {
   const isArrTypeProp = Array.isArray(_type);
   const type = isArrTypeProp ? get(_type, [0]) : _type;
   const typeModeFormat = isArrTypeProp ? get(_type, [1]) : undefined;

   if (type === "datetime") {
      const parsedValue = parseDateValue(value);
      if (isNil(parsedValue) || !parsedValue.isValid()) return null;
      const format = typeModeFormat || DATE_TIME_FORMAT;
      return parsedValue.format(format);
   }

   if (type === "date") {
      const parsedValue = parseDateValue(value);
      if (isNil(parsedValue) || !parsedValue.isValid()) return null;
      const format = typeModeFormat || DATE_FORMAT;
      return parsedValue.format(format);
   }

   if (type === "time") {
      if (isNil(value) || !dayjs(value).isValid()) return null;
      const format = typeModeFormat || TIME_FORMAT;
      return dayjs(value).format(format);
   }

   if (type === "boolean") {
      return value ? <CheckCircle color="success" /> : null;
   }

   return value;
};
