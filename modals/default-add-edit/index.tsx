import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { get, isNumber } from "lodash/fp";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslations } from "next-intl";

import { useGlobalStore } from "@/store/globalStore";
import {
  getRequiredFieldsFromSchemaDescription,
  initializeDefaultValues,
  initializeValidations,
} from "./utils";
import ColumnRenderer from "@/lib/ColumnRenderer";
import CustomModal from "@/lib/CustomModal";

export interface IRecordModal {
  open?: boolean;
  title?: any;
  disabled?: boolean;
  onClose?: () => void;
  columns?: { field: string; valueGetter?: string; headerName: string }[];
  onCommitRow?: (theRow: any) => Promise<boolean>;
  row?: any;
  footerProps?: any;
}

const DefaultAddEditModal: React.FC<IRecordModal> = () => {
  const { modalOpen, closeModal, modalProps } = useGlobalStore();
  const translationSource = get("translationSource", modalProps);
  const t = useTranslations();

  const CustomHeaderBlock = useMemo(
    () => get("CustomHeaderBlock", modalProps),
    [modalProps]
  );
  const CustomFooterBlock = useMemo(
    () => get("CustomFooterBlock", modalProps),
    [modalProps]
  );

  const defaultValues = initializeDefaultValues(modalProps?.columns);
  const validations = initializeValidations(modalProps?.columns);
  const requiredFields = getRequiredFieldsFromSchemaDescription(validations);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(yup.object().shape(validations)),
  });

  useEffect(() => {
    modalProps?.row ? reset(modalProps?.row) : reset();
  }, [modalProps]);

  const handleConfirm = async (data: any) => {
    if (!isDirty) {
      closeModal();
      return;
    }
    await modalProps?.onConfirm(data);
  };

  let defaultTitle;

  if (isNumber(modalProps?.row?.id)) {
    if (get("disabled", modalProps)) {
      defaultTitle = t("INDEX.VIEW_ENTRY");
    } else {
      defaultTitle = t("INDEX.EDIT_ENTRY");
    }
  } else {
    defaultTitle = t("INDEX.CREATE_ENTRY");
  }

  const maxWidth = modalProps?.maxWidth;

  let dialogProps = {};
  if (maxWidth) {
    dialogProps = { ...dialogProps, maxWidth };
  }

  const data = get("row", modalProps);
  const disabledOnView = get("disabled", modalProps);

  return (
    <CustomModal
      open={modalOpen}
      title={get("title", modalProps) ?? defaultTitle}
      onCancel={closeModal}
      onConfirm={
        get("disabled", modalProps) ? undefined : handleSubmit(handleConfirm)
      }
    >
      {CustomHeaderBlock && React.createElement(CustomHeaderBlock)}
      <div className="grid grid-cols-12 gap-x-4">
        {modalProps?.columns?.map((column: any, index: any) => {
          const selectOptions = get(column.field, modalProps);
          return (
            <ColumnRenderer
              key={`${column?.field}-${index}`}
              column={column}
              options={selectOptions}
              data={data}
              translationSource={translationSource}
              disabledOnView={disabledOnView}
              control={control}
              errors={errors}
              watch={watch}
              setValue={setValue}
              required={get(column?.field, requiredFields)}
            />
          );
        })}
      </div>
      {CustomFooterBlock && React.createElement(CustomFooterBlock)}
    </CustomModal>
  );
};

export default DefaultAddEditModal;
