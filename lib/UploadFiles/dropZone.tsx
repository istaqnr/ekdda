import React from "react";
import Dropzone from "react-dropzone";
import Box from "@mui/material/Box";
import { readAndConvertFiles } from "./utils";

interface Props {
   onDocsUpload: (a: any) => void;
   customStyles?: any;
}

const DropZone = ({ onDocsUpload, customStyles }: Props) => {
   const onDropOrDrag = async (files: any) => {
      const convertedFiles = await readAndConvertFiles(files);
      onDocsUpload(convertedFiles);
   };

   return (
      <Box
         id="dropzone-container"
         sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
         }}
      >
         <Box>Επισύναψη Εγγράφων</Box>
         <Dropzone
            // className={{
            //   display: 'flex',
            //   flexDirection: 'column',
            //   alignItems: 'center',
            //   justifyContent: 'center',
            //   gap: '8px',
            //   border: `2px dashed red`,
            //   borderRadius: '8px',
            //   padding: '24px',
            //   '&:hover': {
            //     cursor: 'pointer',
            //   },
            // }}
            onDrop={onDropOrDrag}
            // style={customStyles}
         >
            {(dropzoneProps) => <span>Σύρετε και αποθέστε τα αρχεία σας εδώ.</span>}
         </Dropzone>
      </Box>
   );
};

export default DropZone;
