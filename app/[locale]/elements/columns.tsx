import { T } from "@/lib/types/next-auth";
import { yupSelect } from "@/lib/yup-validations";
import * as yup from "yup";

export const _columns = (t: T) => [
  {
    //'acms-column': 'fldFrmCd',
    field: "cd",
    headerName: "CD",
    type: "string",
    width: 160,
    validation: yup.string().required(t("ERROR.FIELD_IS_REQUIRED")),
  },
  {
    //'acms-column': 'fldFrmDscrTxt',
    field: "dscrTxt",
    headerName: "DESCRIPTION",
    type: "string",
    width: 160,
    validation: yup.string().required(t("ERROR.FIELD_IS_REQUIRED")),
  },
  {
    //'acms-column': 'fldFrmParentalEligibilityFlg',
    field: "parentalEligibilityFlg",
    headerName: "PARENTALELIGIBILITYFLG",
    type: "select",
    width: 160,
    valueGetter: "parentalEligibilityFlg.dscrTxt",
    validation: yupSelect(t),
  },
  {
    //'acms-column': 'fldFrmPermsListFlg',
    field: "permsListFlg",
    headerName: "PERMSLISTFLG",
    type: "select",
    width: 160,
    valueGetter: "permsListFlg.dscrTxt",
    validation: yupSelect(t),
  },
];
