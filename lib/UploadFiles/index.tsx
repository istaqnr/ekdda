import React from "react";

import Box from "@mui/material/Box";
import DropZone from "./dropZone";
import UploadDocs from "./uploadDocs";

type Props = {
   uploadedDocs: Array<object>;
   onDocsUpload: () => void;
   removeUploadedDoc: () => void;
   dropZoneCustomStyles?: any;
};

const UploadFiles = ({ uploadedDocs, onDocsUpload, removeUploadedDoc, dropZoneCustomStyles }: Props) => (
   <Box
      id="upload-files-container"
      sx={{
         display: "flex",
         justifyContent: "center",
         flexDirection: "column",
         gap: "24px",
      }}
   >
      <DropZone onDocsUpload={onDocsUpload} customStyles={dropZoneCustomStyles} />
      <UploadDocs uploadedDocs={uploadedDocs} removeUploadedDoc={removeUploadedDoc} />
   </Box>
);

export default UploadFiles;
