import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { get } from "lodash";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ButtonIcon as QnrButtonIcon, UnifiedButton } from "../Button";
// import { downloadFileByDataset } from '@/qnrLib/utils/files';

interface IFileDownload {
   label?: any;
   name: string;
   control: Control<any, any>;
}

const FileDownload: FC<IFileDownload> = ({ label, name, control }) => {
   const onDownload = (field: any) => {
      // console.log(field);
      const fileDataRaw = get(field, "value");
      const fileDataArray = Array.isArray(fileDataRaw) ? fileDataRaw : [fileDataRaw];

      for (const fileData of fileDataArray) {
         // downloadFileByDataset(fileData);
      }
   };

   return (
      <Controller
         name={name}
         control={control}
         render={({ field }) => {
            // console.log('FileDownload:', field);
            const valueRaw = get(field, "value");

            const valueArray = Array.isArray(valueRaw) ? valueRaw : valueRaw ? [valueRaw] : [];
            const single = valueArray?.length === 1;
            let filename = null;

            if (single) {
               filename = get(valueArray[0], "name");
            } else {
               const filenameArr = [];
               if (valueArray?.length) {
                  for (const value of valueArray) {
                     const filename = get(value, "name");
                     filenameArr.push(filename);
                  }
                  filename = (
                     <div>
                        {filenameArr.map((it, index) => (
                           <div key={index}>{it}</div>
                        ))}
                     </div>
                  );
               }
            }

            // console.log('FileDownload: valueRaw:', valueRaw, valueArray, filename);

            return (
               <div className="flex w-max flex-row items-center gap-1">
                  <span className="text-indigo-600">{label}</span>
                  <UnifiedButton
                     title={filename}
                     size="medium"
                     variant="primary"
                     icon={<FileDownloadIcon />}
                     onClick={() => onDownload(field)}
                     disabled={!valueArray?.length}
                  />
               </div>
            );
         }}
      />
   );
};

export default FileDownload;
