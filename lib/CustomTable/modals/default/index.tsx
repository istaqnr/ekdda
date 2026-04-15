import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { get } from "lodash/fp";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import ColumnRenderer from "@/lib/ColumnRenderer";
import { useGlobalStore } from "@/store/globalStore";
import {
  getDefaultTitle,
  getRequiredFieldsFromSchemaDescription,
  initializeDefaultValues,
  initializeValidations,
} from "./utils";
import CustomModal from "@/lib/CustomModal";

export interface IRecordModal {
  open?: boolean;
  modalTitle?: any; // Optional: Custom modal header (overrides default Add/Edit/View title)
  disabled?: boolean;
  onClose?: () => void;
  columns?: { field: string; valueGetter?: string; modalTitle: string }[];
  onCommitRow?: (theRow: any) => Promise<boolean>;
  row?: any;
  footerProps?: any;
}

const DefaultAddEditModal: React.FC<IRecordModal> = () => {
  const { modalOpen, closeModal, modalProps } = useGlobalStore();
  const translationSource = get("translationSource", modalProps);
  const t = useTranslations();

  const CustomHeaderBlock = get("CustomHeaderBlock", modalProps);
  const CustomFooterBlock = get("CustomFooterBlock", modalProps);
  const CustomBodyBlock = get("CustomBodyBlock", modalProps);

  const defaultValues = initializeDefaultValues(modalProps?.columns);
  const validations = initializeValidations(modalProps?.columns);
  const requiredFields = getRequiredFieldsFromSchemaDescription(validations);
  const defaultTitle = getDefaultTitle(modalProps, t);

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

  const handleConfirm = (data: any) => {
    if (!isDirty) {
      closeModal();
      return;
    }
    modalProps?.onConfirm(data);
  };

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
      title={get("modalTitle", modalProps) ?? defaultTitle}
      onCancel={closeModal}
      onConfirm={
        get("disabled", modalProps) ? undefined : handleSubmit(handleConfirm)
      }
      footerProps={{
        cancel: {
          text: get("disabled", modalProps)
            ? t("INDEX.CLOSE")
            : t("INDEX.CANCEL"),
        },
      }}
    >
      {CustomHeaderBlock && React.createElement(<CustomHeaderBlock />)}
      {CustomBodyBlock ? (
        <CustomBodyBlock
          columnsObj={modalProps?.columns?.reduce(
            (acc: Record<string, any>, col: any) => ({
              ...acc,
              [col.field]: col,
            }),
            {}
          )}
          formProps={{
            control,
            errors,
            watch,
            setValue,
            disabled: disabledOnView,
          }}
          requiredFields={requiredFields}
          modalOptions={modalProps}
        />
      ) : (
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
      )}
      {CustomFooterBlock && React.createElement(<CustomFooterBlock />)}
    </CustomModal>
  );
};

export default DefaultAddEditModal;
