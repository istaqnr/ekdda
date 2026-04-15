import { T } from "@/lib/types/next-auth";
import * as yup from "yup";

export const _columns = (t: T) => [
  {
    field: "infrastructureManagerCode",
    headerName: "Κωδικός του διαχειριστή υποδομής (ΔΥ)",
    type: "string",
    width: 120,
    validation: yup.string().required(t("ERROR.FIELD_IS_REQUIRED")),
  },
  // Επιχειρησιακό σημείο στο τέρμα τμήματος γραμμής (Αρχή)
  {
    field: "operationalPointStart",
    headerName: "Αρχή τμήματος γραμμής",
    type: "string",
    width: 140,
    validation: yup.string().required(t("ERROR.FIELD_IS_REQUIRED")),
  },
  // Αρχή
];
