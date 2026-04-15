import React from "react";
import Box from "@mui/material/Box";
import Close from "@mui/icons-material/Close";

interface Props {
   uploadedDocs: any;
   removeUploadedDoc: (removedItem: any) => void;
}

const UploadDocs = ({ uploadedDocs, removeUploadedDoc }: Props) => {
   const onDocRemove = (docName: any) => () => removeUploadedDoc(docName);

   return uploadedDocs?.length > 0 ? (
      <Box
         id="uploaded-docs-wrapper"
         sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
         }}
      >
         <Box component="span">Συνημμένα Έγγραφα</Box>
         <Box
            sx={{
               display: "flex",
               flexWrap: "wrap",
               gap: "16px",
            }}
         >
            {uploadedDocs?.map((uploadedDoc: any, i: number) => (
               <Box
                  key={i}
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: "12px",
                     boxSizing: "border-box",
                     wordBreak: "break-word",
                     padding: "16px",
                     border: `1px solid #888`,
                     borderRadius: "4px",
                     backgroundColor: "#F9F9F9",
                     "& > span:nth-of-type(1) > svg": {
                        width: "24px",
                        height: "24px",
                        fill: "rebeccapurple",
                     },
                  }}
               >
                  <Box component="span">{uploadedDoc?.name}</Box>
                  <Box
                     sx={{
                        alignSelf: "flex-start",
                        "& > span > svg": {
                           cursor: "pointer",
                           width: "16px",
                           height: "16px",
                           fill: "#333",
                        },
                     }}
                     onClick={onDocRemove(uploadedDoc?.name)}
                  >
                     <Close />
                  </Box>
               </Box>
            ))}
         </Box>
      </Box>
   ) : null;
};

export default UploadDocs;
