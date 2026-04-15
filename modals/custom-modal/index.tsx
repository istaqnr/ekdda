"use client";

import { useGlobalStore } from "@/store/globalStore";
import ConfirmModal from "@/modals/confirm";
import DefaultAddEditModal from "@/modals/default-add-edit";
import DeleteEntryModal from "@/modals/delete-entry";
import ColumnsVisibility from "@/modals/columns-visibility";
import FiltersModal from "@/modals/filters-table";
// import FileUploadModal from "@/modals/file-upload";

const CustomModal = () => {
  const { modalOpen, modalType } = useGlobalStore();

  if (!modalOpen) return null;

  const renderModalContent = () => {
    switch (modalType) {
      case "CONFIRM":
        return <ConfirmModal />;
      case "DELETE_ENTRY":
        return <DeleteEntryModal />;
      case "DEFAULT":
        return <DefaultAddEditModal />;
      // case "TRANSFORM":
      //   return <Transform />;
      case "COLUMNS_VISIBILITY":
        return <ColumnsVisibility />;
      case "FILTERS":
        return <FiltersModal />;
      // case "FILE_UPLOAD":
      //   return <FileUploadModal />;
      default:
        return <div>Unknown Modal</div>;
    }
  };

  return renderModalContent();
};

export default CustomModal;
