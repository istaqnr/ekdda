import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import isFunction from "lodash/fp/isFunction";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import { get } from "lodash/fp";
import { Column } from "@/lib/interfaces";
import ColumnRenderer from "@/lib/ColumnRenderer";
import {
  getRequiredFieldsFromSchemaDescription,
  initializeDefaultValues,
  initializeValidations,
} from "./utils";

export interface SimpleFormProps {
  columns: Column[];
  data?: any;
  translationSource?: string;
  selectOptions?: { [key: string]: any };
  onConfirm?: any;
  confirmButtonText?: string;
  onCancel?: any;
  disabled?: boolean;
  linkTo?: (field: string) => void;
}

const SimpleForm: React.FC<SimpleFormProps> = ({
  columns,
  data,
  translationSource,
  selectOptions,
  onConfirm,
  confirmButtonText,
  onCancel,
  disabled: disabledOnView = false,
  linkTo,
}) => {
  const t = useTranslations();
  const defaultValues = initializeDefaultValues(columns);
  const validations = initializeValidations(columns);
  const requiredFields = getRequiredFieldsFromSchemaDescription(validations);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    defaultValues,
    resolver: yupResolver(yup.object().shape(validations)),
  });

  useEffect(() => {
    data && reset(data);
  }, [data]);

  const handleConfirm = (data: any) => {
    onConfirm(data);
  };

  const footerProps = {
    cancel: {
      handler: onCancel,
      text: t("INDEX.CANCEL"),
      show: isFunction(onCancel),
      disabled: disabledOnView,
    },
    confirm: {
      handler: handleSubmit(handleConfirm),
      text: confirmButtonText ?? t("INDEX.CONFIRM"),
      show: isFunction(onConfirm),
      disabled: disabledOnView,
    },
  };

  return (
    <div className="md:p-2 px-4 pt-6 w-full">
      <div className="grid grid-auto-flow md:grid-cols-12 md:items-center gap-x-4 gap-y-1">
        {columns?.map((column: Column, index: number) => {
          const options = selectOptions && selectOptions[column?.field];
          return (
            <ColumnRenderer
              key={`${column?.field}-${index}`}
              column={column}
              options={options}
              data={data}
              translationSource={translationSource}
              disabledOnView={disabledOnView}
              control={control}
              errors={errors}
              watch={watch}
              linkTo={linkTo}
              required={get(column?.field, requiredFields)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SimpleForm;
