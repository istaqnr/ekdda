import React from "react";
import { get } from "lodash";

import { useTranslations } from "next-intl";

import { useGlobalStore } from "@/store/globalStore";
import CustomModal from "@/lib/CustomModal";

const ConfirmModal: React.FC = () => {
  const { modalOpen, closeModal, modalProps } = useGlobalStore();
  const t = useTranslations("INDEX");

  // TODO: should translate default values
  const defaultProps = {
    title: "Είστε σίγουρος ότι θέλετε να προχωρήσετε;",
    onCancel: closeModal,
    onConfirm: closeModal,
    dialogProps: { maxWidth: "sm" },
    footerProps: {
      cancel: { text: modalProps?.cancelText || t("CANCEL") },
      confirm: { text: modalProps?.confirmText || t("CONFIRM") },
      classes: { confirm: "text-white shadow-none hover:shadow-none" },
    },
  };

  const title = get(modalProps, "title", defaultProps.title);
  const onCancel = get(modalProps, "onCancel", defaultProps.onCancel);
  const onConfirm = get(modalProps, "onConfirm", defaultProps.onConfirm);

  return (
    <CustomModal
      open={modalOpen}
      title={title}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default ConfirmModal;
