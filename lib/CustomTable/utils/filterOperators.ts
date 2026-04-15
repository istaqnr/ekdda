import { T } from "@/lib/types/next-auth";

export const _operatorLabels = (t: T) => ({
  contains: t("OPERATORS.CONTAINS"),
  equals: t("OPERATORS.EQUALS"),
  notEquals: t("OPERATORS.NOT_EQUALS"),
  startsWith: t("OPERATORS.STARTS_WITH"),
  endsWith: t("OPERATORS.ENDS_WITH"),
  isEmpty: t("OPERATORS.IS_EMPTY"),
  isNotEmpty: t("OPERATORS.IS_NOT_EMPTY"),
  is: t("OPERATORS.IS"),
  isTrue: t("OPERATORS.IS"),
  isFalse: t("OPERATORS.IS"),
  not: t("OPERATORS.NOT"),
  after: t("OPERATORS.AFTER"),
  onOrAfter: t("OPERATORS.ON_OR_AFTER"),
  before: t("OPERATORS.BEFORE"),
  onOrBefore: t("OPERATORS.ON_OR_BEFORE"),
  between: t("OPERATORS.BETWEEN"),
  notBetween: t("OPERATORS.NOT_BETWEEN"),
});

export const _operatorOptions = (t: T) => [
  { id: 1, value: "contains", label: t("OPERATORS.CONTAINS") },
  { id: 2, value: "equals", label: t("OPERATORS.EQUALS") },
  { id: 3, value: "startsWith", label: t("OPERATORS.STARTS_WITH") },
  { id: 4, value: "endsWith", label: t("OPERATORS.ENDS_WITH") },
  { id: 5, value: "isEmpty", label: t("OPERATORS.IS_EMPTY") },
  { id: 6, value: "isNotEmpty", label: t("OPERATORS.IS_NOT_EMPTY") },
];

export const _operatorOptionsSelect = (t: T) => [
  { id: 1, value: "equals", label: t("OPERATORS.EQUALS") },
  { id: 2, value: "isEmpty", label: t("OPERATORS.IS_EMPTY") },
  { id: 3, value: "isNotEmpty", label: t("OPERATORS.IS_NOT_EMPTY") },
];

export const _operatorOptionsDate = (t: T) => [
  { id: 1, value: "is", label: t("OPERATORS.IS") },
  { id: 2, value: "not", label: t("OPERATORS.NOT") },
  { id: 3, value: "after", label: t("OPERATORS.AFTER") },
  { id: 4, value: "onOrAfter", label: t("OPERATORS.ON_OR_AFTER") },
  { id: 5, value: "before", label: t("OPERATORS.BEFORE") },
  { id: 6, value: "onOrBefore", label: t("OPERATORS.ON_OR_BEFORE") },
  { id: 7, value: "isEmpty", label: t("OPERATORS.IS_EMPTY") },
  { id: 8, value: "isNotEmpty", label: t("OPERATORS.IS_NOT_EMPTY") },
  { id: 9, value: "between", label: t("OPERATORS.BETWEEN") },
];

export const _operatorOptionsNumber = (t: T) => [
  { id: 1, value: "&", label: t("OPERATORS.AND") },
  { id: 2, value: "=", label: t("OPERATORS.EQUALS") },
  { id: 3, value: ">", label: t("OPERATORS.BIGGER") },
  { id: 4, value: ">=", label: t("OPERATORS.BIGGER_THAN") },
  { id: 5, value: "<", label: t("OPERATORS.LESS") },
  { id: 6, value: "<=", label: t("OPERATORS.LESS_THAN") },
  { id: 7, value: "!=", label: t("OPERATORS.NOT_EQUALS") },
];

export const _operatorOptionsBoolean = (t: T) => [
  { value: "", label: "" },
  { value: "is", label: t("OPERATORS.IS") },
];

export const optionsBooleanValues = (t: T) => [
  { value: true, dscrTxt: t("YES") },
  { value: false, dscrTxt: t("NO") },
];
