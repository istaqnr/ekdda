import dayjs from "dayjs";
import * as yup from "yup";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

// const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const yupSelect = (t: any) =>
   yup
      .object()
      .nullable()
      .transform((value) => (value === "" ? null : value));

export const yupSelectRequired = (t: any) =>
   yup
      .object()
      .transform((value) => (value === "" ? null : value))
      .required(t("ERROR.FIELD_IS_REQUIRED"))
      .typeError(t("ERROR.FIELD_IS_REQUIRED"));

export const yupStringRequiredMax = (t: any, fieldName: string, max: number) =>
   yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .required(t("ERROR.FIELD_IS_REQUIRED"))
      .max(max, `Το ${fieldName} δεν μπορεί να υπερβαίνει τους ${max} χαρακτήρες.`);

export const yupStringMax = (t: any, fieldName: string, max: number) =>
   yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .max(max, `Το ${fieldName} δεν μπορεί να υπερβαίνει τους ${max} χαρακτήρες.`);

// Identity Code: uppercase Greek letters and digits only, no spaces
export const yupIdentityCodeRequired = (t: any) =>
   yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .required(t("ERROR.FIELD_IS_REQUIRED"))
      .matches(/^[Α-Ω0-9]+$/, t("ERROR.INVALID_IDENTITY_CODE"));

export const yupMultiSelect = (t: any) =>
   yup
      .array()
      .of(yup.object().nullable())
      .nullable()
      .transform((value) => (value?.some((item: any) => item === "") ? null : value));

export const yupIdOrPassportRequired = (t: any) =>
   yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .required(t("ERROR.FIELD_IS_REQUIRED"))
      .matches(/^[A-ZΑ-Ω0-9]+$/, t("ERROR.INVALID_ID_PASSPORT_CODE"));

export const yupMultiSelectRequired = (t: any) =>
   yup
      .array()
      .of(yup.object().nullable())
      .transform((value) => (value?.some((item: any) => item === "") ? null : value))
      .required(t("ERROR.FIELD_IS_REQUIRED"))
      .typeError(t("ERROR.FIELD_IS_REQUIRED"));

export const yupString = (t: any) => yup.string().nullable();

export const yupStringRequired = (t: any) => yup.string().nullable().required(t("ERROR.FIELD_IS_REQUIRED"));

export const yupDate = (t: any) =>
   yup
      .string()
      .nullable() // Allow null values
      .transform((value, originalValue) =>
         originalValue === "" || !value ? null : dayjs(value).format("YYYY-MM-DD")
      );

export const yupDateRequired = (t: any) =>
   yup
      .string()
      .nullable() // Allow null values
      .transform((value, originalValue) =>
         originalValue === "" || !value ? null : dayjs(value).format("YYYY-MM-DD")
      )
      .required(t("ERROR.FIELD_IS_REQUIRED"));

export const yupMaxDate = (maxDate: dayjs.Dayjs, t: any) =>
   yup
      .string()
      .nullable() // Allow null values
      .transform((value, originalValue) =>
         originalValue === "" || !value ? null : dayjs(value).format("YYYY-MM-DD")
      )
      .test(
         "maxDate",
         `${t("ERROR.DATE_BEFORE_OR_EQUAL_TO")} ${dayjs(maxDate).format("DD-MM-YYYY")}`,
         (value) => {
            if (!value) return true; // Allow nulls
            return dayjs(value).isSameOrBefore(maxDate, "day");
         }
      );

export const yupDateTime = (t: any) =>
   yup
      .string()
      .nullable() // Allow null values
      .transform((value, originalValue) =>
         originalValue === "" || !value ? null : dayjs(value).format("YYYY-MM-DDTHH:mm:ss")
      );

export const yupDateTimeRequired = (t: any) =>
   yup
      .string()
      .nullable() // Allow null values
      .transform((value, originalValue) => {
         if (originalValue === "" || !value) return null;
         const formattedDate = dayjs(originalValue).toISOString(); // Ensure ISO 8601 format
         return formattedDate;
      })
      .required(t("ERROR.FIELD_IS_REQUIRED"));

export const yupNumber = (t: any) =>
   yup
      .number()
      .nullable() // Allow null values
      .transform((value, originalValue) => (originalValue === "" ? null : value)); // Transform "" to null;

export const yupNumberRequired = (t: any) =>
   yup
      .number()
      .nullable()
      .transform((value, originalValue) => (originalValue === "" ? null : value)) // Transform "" to null
      .required(t("ERROR.FIELD_IS_REQUIRED"));

export const yupNumberGreaterThan = (min: number, t: any) =>
   yup
      .number()
      .nullable() // Allow null values
      .transform((value, originalValue) => (originalValue === "" ? null : value)) // Transform "" to null
      .moreThan(min, `${t("ERROR.NUMBER_GREATER_THAN")} ${min}`);

export const yupNumberMax = (t: any, max: number) =>
   yup
      .number()
      .nullable()
      .transform((value, originalValue) => (originalValue === "" ? null : value))
      .max(max, `${t("ERROR.NUMBER_MAX")} ${max}`);

export const yupNumberGreaterOrEqualTo = (min: number, t: any) =>
   yup
      .number()
      .nullable() // Allow null values
      .transform((value, originalValue) => (originalValue === "" ? null : value)) // Transform "" to null
      .min(min, `${t("ERROR.NUMBER_GREATER_OR_EQUAL_TO")} ${min}`);

export const yupNumberGreaterThanZero = (t: any) =>
   yup
      .number()
      .nullable() // Allow null values
      .transform((value, originalValue) => (originalValue === "" ? null : value)) // Transform "" to null
      .min(0, t("ERROR.FIELD_IS_POSITIVE")) // Add a minimum value check (positive number)
      .test(
         "greater-than-min",
         t("ERROR.MAX_GREATER_THAN_MIN"), // Custom error message
         (value) => {
            // Name the function
            if (value !== null && value !== undefined) {
               return value >= 0; // Ensure value is positive
            }
            return true;
         }
      );

export const yupNumberGreaterThanZeroForMax = (t: any) =>
   yup
      .number()
      .nullable() // Allow null values
      .transform((value, originalValue) => (originalValue === "" ? null : value)) // Transform "" to null
      .min(0, t("ERROR.FIELD_IS_POSITIVE")) // Add a minimum value check (positive number)
      .test("max-gt-min", t("ERROR.MAX_GREATER_THAN_MIN"), function maxGreaterThanMin(value) {
         const { minAmnt } = this.parent; // Get the minAmnt from the same parent context (form)

         // Check if value is not undefined or null and minAmnt exists
         if (value !== undefined && value !== null && minAmnt !== undefined) {
            return value >= minAmnt; // Ensure maxAmnt is greater than or equal to minAmnt
         }

         return true; // If no minAmnt, validation passes
      });

export const yupNumberPercentageChange = (t: any) =>
   yup
      .number()
      .nullable()
      .transform((value, originalValue) => (originalValue === "" ? null : value))
      .test("valid-range", t("ERROR.PERSENTAGE_CHANGE"), (value) => {
         if (value === null) return true;
         if (typeof value !== "number" || Number.isNaN(value)) {
            return false;
         }
         return value !== 0 && value >= -99 && value <= 99;
      });

// AFM validation function
const isValidAfm = (afm: string | undefined | null): boolean => {
   if (!afm || !/^\d{9}$/.test(afm)) return false;

   const digits = afm.split("").map(Number);
   const checkDigit = digits.pop(); // Last digit (index 8)

   const sum = digits.reduce((acc, digit, index) => acc + digit * 2 ** (8 - index), 0);

   const remainder = sum % 11;
   const calculatedCheckDigit = remainder % 10;

   return checkDigit === calculatedCheckDigit;
};

// Yup schema with AFM validation
export const yupAfm = (t: any) =>
   yup
      .string()
      .required(t("ERROR.FIELD_IS_REQUIRED"))
      .matches(/^\d{9}$/, t("ERROR.AFM_9_DIGITS"))
      .test("is-valid-afm", t("ERROR.NOT_VALID_AFM"), (value) => isValidAfm(value || ""));

export const yupEmail = (t: any) => yup.string().email(t("ERROR.NOT_VALID_EMAIL"));

export const yupValidYear = (minYear: number | "current-year", maxYear: number | "current-year", t: any) => {
   const minLimit = minYear === "current-year" ? new Date().getFullYear() : minYear;
   const maxLimit = maxYear === "current-year" ? new Date().getFullYear() : maxYear;
   const errorMessage = `${t("ERROR.VALID_YEARS_RANGE_FROM")} ${minLimit} ${t("ERROR.VALID_YEAR_RANGE_TO")} ${maxLimit}`;

   return yupString(t).test("valid-year", errorMessage, (value) => {
      const year = Number(value);
      if (!value) return true; // allow null or empty values
      // const currentYear = new Date().getFullYear();
      return /^\d{4}$/.test(value) && year >= minLimit && year <= maxLimit;
   });
};

// AMKA: 11 numeric digits
export const yupAmka = (t: any) =>
   yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .test("valid-amka", t("ERROR.INVALID_AMKA"), (value) => {
         if (!value) return true;
         return /^\d{11}$/.test(value);
      });

// AMA: 5 to 11 numeric digits
export const yupAma = (t: any) =>
   yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .test("valid-ama", t("ERROR.INVALID_AMA"), (value) => {
         if (!value) return true;
         return /^\d{5,11}$/.test(value);
      });

export const yupZipCode = (t: any) =>
   yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .test("valid-zipCode", t("ERROR.INVALID_ZIP_CODE"), (value) => {
         if (!value) return true;
         return /^\d{5}$/.test(value);
      });

export const yupTelephone = (t: any) =>
   yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .test("valid-telephone", t("ERROR.INVALID_TELEPHONE"), (value) => {
         if (!value) return true;
         return /^2\d{9}$/.test(value);
      });

export const yupMobileTelephone = (t: any) =>
   yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .test("valid-mobile-telephone", t("ERROR.INVALID_MOBILE_TELEPHONE"), (value) => {
         if (!value) return true;
         return /^69\d{8}$/.test(value);
      });
