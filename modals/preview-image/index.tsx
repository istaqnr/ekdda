import React from "react";
import Box from "@mui/material/Box";
import { useTranslations } from "next-intl";

import { useGlobalStore } from "@/store/globalStore";
import CustomModal from "@/lib/CustomModal";

const acceptedTypesExt: Record<string, string[]> = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpeg", ".jpg"],
  "image/png": [".png"],
};

const getFileExtension = (fileName: string = "") => {
  const extMatch = fileName.match(/\.[^/.]+$/);
  return extMatch ? extMatch[0].toLowerCase() : "";
};

const getMimeTypeFromExtension = (ext: string): string | null => {
  for (const [mime, extList] of Object.entries(acceptedTypesExt)) {
    if (extList.includes(ext)) {
      return mime;
    }
  }
  return null;
};

const PreviewFileModal: React.FC = () => {
  const { modalOpen, closeModal, modalProps } = useGlobalStore();
  const t = useTranslations("INDEX");

  // const fileName = modalProps?.row?.fileName || '';
  const fileName =
    modalProps?.row?.fileName || modalProps?.row?.fileNameTxt || "";
  const blobUrl = modalProps?.blobUrl;
  const ext = getFileExtension(fileName);

  const mimeType = getMimeTypeFromExtension(ext);

  const renderPreview = () => {
    if (!blobUrl || !mimeType)
      return (
        <div className="text-sm text-gray-500">
          Δεν υποστηρίζεται προεπισκόπηση για αυτόν τον τύπο αρχείου.
        </div>
      );

    switch (mimeType) {
      case "image/jpeg":
      case "image/png":
        return (
          <Box
            component="img"
            src={blobUrl}
            alt="Preview"
            className="h-full w-full object-contain"
          />
        );

      case "application/pdf":
        return (
          <iframe
            src={`${blobUrl}#zoom=80&navpanes=0`}
            className=" h-full w-full"
            title="PDF Preview"
          />
        );

      default:
        // For anything else (should not happen), no preview
        return (
          <div className="text-sm text-gray-500">
            Δεν υποστηρίζεται προεπισκόπηση για αυτόν τον τύπο αρχείου.
          </div>
        );
    }
  };

  return (
    <CustomModal
      open={modalOpen}
      title={modalProps?.title}
      onCancel={closeModal}
      footerProps={{ cancel: { text: t("CLOSE") } }}
    >
      <div className="h-full w-full px-4  flex flex-col">
        <h3>Όνομα Αρχείου: {fileName}</h3>
        <div className="flex-1 min-h-0">{renderPreview()}</div>
      </div>
    </CustomModal>
  );
};

export default PreviewFileModal;
