import React from "react";
import { get } from "lodash";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import { useGlobalStore } from "@/store/globalStore";
import CustomModal from "@/lib/CustomModal";

const getFieldAttr = (column: any) => {
  return column.valueGetter || column.field;
};

const DeleteEntryModal: React.FC = () => {
  const { modalOpen, closeModal, modalProps } = useGlobalStore();

  const translationSource = get(modalProps, "translationSource");
  const t = useTranslations();

  const handleConfirm = async (data: any) => {
    await modalProps?.onConfirm(data);
  };

  const maxWidth = modalProps?.maxWidth;
  let dialogProps = {};
  if (maxWidth) {
    dialogProps = { ...dialogProps, maxWidth };
  }

  const defaultMessage =
    "Είστε σίγουρος ότι θέλετε να διαγράψετε αυτή την εγγραφή;";

  return (
    <CustomModal
      open={modalOpen}
      title={modalProps?.title}
      onCancel={closeModal}
      onConfirm={(data: any) => handleConfirm(data)}
    >
      <div className="font-bold flex justify-center mt-2 mb-5 text-xl">
        {modalProps?.message || defaultMessage}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {modalProps?.columns?.map((column: any) => {
          //TODO change it by QNRText or any component like select, checkboc etc (react-hook-form required)
          const attr = getFieldAttr(column);
          const value = get(modalProps?.row, attr, "");
          const headerName: string = get(column, "headerName", "");
          const label: string = translationSource
            ? t(`${translationSource}.${headerName}`)
            : headerName;

          return (
            <div key={column.field}>
              <TextField fullWidth disabled label={label} value={value} />
            </div>
          );
        })}
      </div>
    </CustomModal>
  );
};

export default DeleteEntryModal;
