import { useCallback } from "react";
import { get } from "lodash";

import useLoadNotify from "@/lib/hooks/useApi/useLoadNotify";
import mainApi from "@/ui/mainApi";
import { genericDownloadFileToBrowser } from "@/lib/handleDownload";

const useExportCSV = (url: string) => {
  const { callRequest } = useLoadNotify();

  const exportToExcel = useCallback(
    async (visibleColumns: any[], apiFilters: any) =>
      callRequest(
        async () => {
          const response = await mainApi.post(
            url,
            {
              ...apiFilters,
              exportCols: visibleColumns.map((item: any) => ({
                field: item.field,
                label: get(item, "label", get(item, "headerName", "")),
              })),
              linkOperator: "and",
            },
            { responseType: "blob" }
          );
          genericDownloadFileToBrowser(response, "export.xlsx");
          return true;
        },
        { successMessage: "Exported!" }
      ),
    [url]
  );

  return exportToExcel;
};

export default useExportCSV;
