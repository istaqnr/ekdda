import React from "react";
import { useTranslations } from "next-intl";

import { useGlobalStore } from "@/store/globalStore";
import CustomModal from "@/lib/CustomModal";

const ConfirmModal: React.FC = () => {
  const { modalOpen, closeModal, modalProps } = useGlobalStore();
  const t = useTranslations();

  const handleConfirm = () => {
    if (modalProps?.onConfirm) {
      modalProps.onConfirm();
    }
    closeModal();
  };

  const handleCancel = () => {
    if (modalProps?.onCancel) {
      modalProps.onCancel();
    }
    closeModal();
  };

  const message =
    modalProps?.message || "Θέλετε να αποθηκεύσετε τις αλλαγές σας;";
  const confirmText = modalProps?.confirmText || t("INDEX.YES");
  const cancelText = modalProps?.cancelText || t("INDEX.NO");

  return (
    <CustomModal
      open={modalOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      maxWidth="sm"
    >
      <div className="text-center py-4">
        {typeof message === "string" ? (
          <p className="text-lg font-medium">{message}</p>
        ) : (
          message
        )}
      </div>
    </CustomModal>
  );
};

export default ConfirmModal;
