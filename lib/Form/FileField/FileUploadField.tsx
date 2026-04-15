import React, { useState, createRef, useEffect } from "react";
import { Controller } from "react-hook-form";
import { get } from "lodash";
import Dropzone from "react-dropzone";
import Tooltip from "@mui/material/Tooltip";
import FormHelperText from "@mui/material/FormHelperText";
import InsertDriveFile from "@mui/icons-material/InsertDriveFile";
import Close from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonIcon from "../Button/ButtonIcon";
import { UnifiedButton } from "../Button";

interface FileUploadFieldProps {
   name: string;
   multiple?: boolean;
   onError?: (err: any) => void;
   onSetFiles?: (files: any) => void;
   onClearFiles?: (files: any) => void;
   maxFiles?: number;
   minSize?: number;
   maxSize?: number;
   accept?: Array<string | Record<string, string[]>>;
   fileType?: "image" | "document";
   disabled?: boolean;

   // React Hook Form props (optional)
   errors?: any;
   control?: any;
}

type FileWithPreview = File & {
   preview?: string;
};

// ==================== UTILITY FUNCTIONS ====================

const acceptedFileTypes = {
   "application/pdf": [".pdf"],
   "application/msword": [".doc"],
   "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
   "application/vnd.ms-excel": [".xls"],
   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
   "image/jpeg": [".jpeg", ".jpg"],
   "image/png": [".png"],
};

const getAcceptForType = (type?: string): Record<string, string[]> => {
   switch (type) {
      case "image":
         return { "image/jpeg": [".jpeg", ".jpg"], "image/png": [".png"] };
      case "document":
         return {
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
         };
      default:
         return acceptedFileTypes;
   }
};

const normalizeAccept = (accept?: Array<string | Record<string, string[]>>): Record<string, string[]> => {
   if (!accept) return acceptedFileTypes;

   const result: Record<string, string[]> = {};
   accept.forEach((item) => {
      if (typeof item === "string" && acceptedFileTypes[item as keyof typeof acceptedFileTypes]) {
         result[item] = acceptedFileTypes[item as keyof typeof acceptedFileTypes];
      } else if (typeof item === "object") {
         Object.assign(result, item);
      }
   });

   return Object.keys(result)?.length > 0 ? result : acceptedFileTypes;
};

const handleFileError = (rejectedFiles: any, name: string, onError?: (err: any) => void) => {
   if (rejectedFiles?.length > 0) {
      const error = get(rejectedFiles[0], "errors[0]");
      onError?.({ name, ...error });
      return true;
   }
   return false;
};

const processDroppedFiles = (
   newFiles: FileWithPreview[],
   currentFiles: FileWithPreview[],
   multiple: boolean,
   maxFiles: number,
   field: any,
   onSetFiles?: (files: any) => void,
   setFiles?: (files: FileWithPreview[]) => void
) => {
   if (multiple) {
      const allFiles = [...currentFiles, ...newFiles].slice(0, maxFiles);
      if (field) {
         field.onChange(allFiles);
      }
      if (setFiles) {
         setFiles(allFiles);
      }
      onSetFiles?.(allFiles);
      return allFiles;
   }
   const singleFile = newFiles[0] || null;
   if (field) {
      field.onChange(singleFile);
   }
   if (setFiles) {
      setFiles(newFiles);
   }
   onSetFiles?.(newFiles);
   return newFiles;
};

const handleClearFiles = (multiple: boolean, field: any, onClearFiles?: (files: any) => void) => {
   const value = multiple ? [] : null;
   if (field) {
      field.onChange(value);
   }
   onClearFiles?.(value);
};

const handleRemoveFile = (
   index: number,
   currentFiles: FileWithPreview[],
   multiple: boolean,
   field: any,
   onSetFiles?: (files: any) => void,
   onClearFiles?: (files: any) => void
) => {
   if (!multiple) {
      handleClearFiles(multiple, field, onClearFiles);
      return;
   }

   const updatedFiles = currentFiles.filter((_, i) => i !== index);
   if (field) {
      field.onChange(updatedFiles);
   }
   onSetFiles?.(updatedFiles);
};

const cleanupPreviews = (files: FileWithPreview[]) => {
   files.forEach((file) => {
      if (file.preview) {
         URL.revokeObjectURL(file.preview);
      }
   });
};

const formatFileSize = (size: number): string => (size / 1024).toFixed(1);

// ==================== UI COMPONENTS ====================

interface FileListProps {
   files: FileWithPreview[];
   onRemoveFile: (index: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onRemoveFile }) => (
   <div className="space-y-1 mt-2">
      <div className="border-t pt-2">
         <span className="text-xs text-gray-500">Επιλεγμένα αρχεία:</span>
      </div>
      {files.map((file, index) => (
         <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded text-xs">
            <Tooltip title={file.name}>
               <span className="truncate">
                  {file.name} ({formatFileSize(file.size)} KB)
               </span>
            </Tooltip>
            <ButtonIcon
               icon={<DeleteIcon />}
               onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFile(index);
               }}
               size="small"
               sx={{ color: "red" }}
            />
         </div>
      ))}
   </div>
);

interface DropzoneContentProps {
   files: FileWithPreview[];
   getRootProps: any;
   getInputProps: any;
   disabled: boolean;
   dropzoneRef: any;
   onClearFiles: () => void;
   onRemoveFile: (index: number) => void;
   errors: any;
   name: string;
   multiple: boolean;
}

const DropzoneContent: React.FC<DropzoneContentProps> = ({
   files,
   getRootProps,
   getInputProps,
   disabled,
   dropzoneRef,
   onClearFiles,
   onRemoveFile,
   errors,
   name,
   multiple,
}) => (
   <div className="flex flex-col space-y-2">
      <div {...getRootProps()} className="p-3 border border-dashed border-gray-300 rounded-lg min-h-[120px]">
         <input {...getInputProps()} disabled={disabled} />

         <div className="flex items-center space-x-2">
            <UnifiedButton
               variant="none"
               size="medium"
               icon={<InsertDriveFile />}
               title="Ανεβάστε αρχείο"
               disabled={disabled}
               onClick={() => dropzoneRef.current?.open?.()}
            />

            <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
               {files?.length > 0
                  ? multiple
                     ? "Έχουν επιλεγεί αρχεία"
                     : "Έχει επιλεγεί αρχείο"
                  : multiple
                    ? "Επιλέξτε αρχεία ή σύρετε εδώ"
                    : "Επιλέξτε αρχείο ή σύρετε εδώ"}
            </span>

            <div className="flex-1" />

            {files?.length > 0 && (
               <UnifiedButton
                  variant="none"
                  size="small"
                  icon={<Close />}
                  onClick={(e: any) => {
                     e.stopPropagation();
                     onClearFiles();
                  }}
                  disabled={disabled}
                  color="error"
               />
            )}
         </div>
      </div>

      {files?.length > 0 && <FileList files={files} onRemoveFile={onRemoveFile} />}

      {get(errors, name) && <FormHelperText error>{get(errors[name], "message", "Error")}</FormHelperText>}
   </div>
);

// ==================== MAIN COMPONENT ====================

const FileUploadField: React.FC<FileUploadFieldProps> = ({
   name,
   multiple = false,
   onError,
   onSetFiles,
   onClearFiles,
   maxFiles = 10,
   minSize = 1024,
   maxSize = 4194304,
   accept,
   fileType,
   disabled = false,
   control,
   errors,
}) => {
   const dropzoneRef = createRef<any>();
   const [files, setFiles] = useState<FileWithPreview[]>([]);

   // Cleanup preview URLs when component unmounts
   useEffect(
      () => () => {
         if (!control) {
            cleanupPreviews(files);
         }
      },
      [files, control]
   );

   // React Hook Form integration
   if (control) {
      const ControlledDropzone: React.FC<{ field: any }> = ({ field }) => {
         const currentFiles = Array.isArray(field.value) ? field.value : field.value ? [field.value] : [];

         const handleDrop = (newFiles: FileWithPreview[], rejectedFiles: any) => {
            if (handleFileError(rejectedFiles, name, onError)) return;
            processDroppedFiles(newFiles, currentFiles, multiple, maxFiles, field, onSetFiles);
         };

         const clearFiles = () => handleClearFiles(multiple, field, onClearFiles);
         const removeFile = (index: number) =>
            handleRemoveFile(index, currentFiles, multiple, field, onSetFiles, onClearFiles);

         // Cleanup preview URLs for controlled version
         useEffect(() => () => cleanupPreviews(currentFiles), [currentFiles]);

         return (
            <Dropzone
               onDrop={handleDrop}
               ref={dropzoneRef}
               minSize={minSize}
               maxSize={maxSize}
               multiple={multiple}
               maxFiles={maxFiles}
               disabled={disabled}
               noClick
               noKeyboard
               accept={fileType ? getAcceptForType(fileType) : normalizeAccept(accept)}
            >
               {({ getRootProps, getInputProps }) => (
                  <DropzoneContent
                     files={currentFiles}
                     getRootProps={getRootProps}
                     getInputProps={getInputProps}
                     disabled={disabled}
                     dropzoneRef={dropzoneRef}
                     onClearFiles={clearFiles}
                     onRemoveFile={removeFile}
                     errors={errors}
                     name={name}
                     multiple={multiple}
                  />
               )}
            </Dropzone>
         );
      };

      return (
         <Controller
            name={name}
            control={control}
            render={({ field }) => <ControlledDropzone field={field} />}
         />
      );
   }

   // Direct usage (uncontrolled)
   const handleDrop = (newFiles: FileWithPreview[], rejectedFiles: any) => {
      if (handleFileError(rejectedFiles, name, onError)) return;
      processDroppedFiles(newFiles, files, multiple, maxFiles, null, onSetFiles, setFiles);
   };

   const clearFiles = () => {
      setFiles([]);
      handleClearFiles(multiple, null, onClearFiles);
   };

   const removeFile = (index: number) => {
      if (!multiple) {
         clearFiles();
         return;
      }

      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      onSetFiles?.(updatedFiles);
   };

   return (
      <Dropzone
         onDrop={handleDrop}
         ref={dropzoneRef}
         minSize={minSize}
         maxSize={maxSize}
         multiple={multiple}
         maxFiles={maxFiles}
         disabled={disabled}
         noClick
         noKeyboard
         accept={fileType ? getAcceptForType(fileType) : normalizeAccept(accept)}
      >
         {({ getRootProps, getInputProps }) => (
            <DropzoneContent
               files={files}
               getRootProps={getRootProps}
               getInputProps={getInputProps}
               disabled={disabled}
               dropzoneRef={dropzoneRef}
               onClearFiles={clearFiles}
               onRemoveFile={removeFile}
               errors={errors}
               name={name}
               multiple={multiple}
            />
         )}
      </Dropzone>
   );
};

export default FileUploadField;
