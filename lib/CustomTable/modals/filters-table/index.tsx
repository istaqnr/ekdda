import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import get from "lodash/fp/get";
import { DropdownField } from "@/lib/Form";
import CustomModal from "@/lib/CustomModal";
import { useGlobalStore } from "@/store/globalStore";
import useFilterSortStore from "@/store/filterSortStore";
import { IFilterItem } from "@/lib/interfaces/global";

import { optionsBooleanValues } from "@/lib/CustomTable/utils/filterOperators";
import FormField from "@/lib/FormField";
import {
  getOperatorList,
  initializeDefaultFilterValues,
  processFilters,
} from "./utils";

const FiltersModal: React.FC = () => {
  const t = useTranslations();
  const { modalOpen, closeModal, modalProps } = useGlobalStore();
  const { setFilters, filters } = useFilterSortStore({
    queryKey: modalProps?.queryKey,
  });

  const translationSource = modalProps?.translationSource;

  const defaultValues = initializeDefaultFilterValues({
    modalProps,
    filters,
    t,
  });

  const { handleSubmit, control, watch, setValue } = useForm({ defaultValues });

  const columnOperation = (field: string, type?: string) => `${field}_${type}`;

  const handleConfirm = (data: any) => {
    const filtersNorm: IFilterItem[] = processFilters(
      data,
      modalProps?.columns
    );

    setFilters([...filtersNorm]);
    modalProps?.onConfirm();
  };

  const maxWidth = modalProps?.maxWidth || "md";

  // Watch all boolean fields and auto-set operators
  useEffect(() => {
    if (!modalProps?.columns) return;

    const subscription = watch((value, { name }) => {
      // Only handle boolean value field changes
      if (!name?.endsWith("_value")) return;

      const fieldName = name.replace("_value", "");
      const column = modalProps.columns.find(
        (col: any) => col.field === fieldName
      );

      if (column?.type === "boolean" && value[name]) {
        const isBooleanValue =
          typeof value[name] === "boolean" ||
          typeof value[name]?.value === "boolean";

        if (isBooleanValue) {
          const operatorOptions = getOperatorList(column.type, t);
          const isOperator = operatorOptions.find(
            (opt: any) => opt.value === "is"
          );
          if (isOperator) {
            setValue(`${fieldName}_operator`, isOperator, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [modalProps?.columns, watch, setValue, t]);

  return (
    <CustomModal
      open={modalOpen}
      title={modalProps?.title}
      onCancel={closeModal}
      onConfirm={handleSubmit(handleConfirm)}
    >
      <form className="mt-2">
        <div className="flex flex-col gap-2">
          {modalProps?.columns?.map((column: any) => {
            const { field, type, filterable = true } = column || {};
            const operName = columnOperation(field, "operator");
            const valName = columnOperation(field, "value");

            const watchedOperator = watch(operName);

            const label = translationSource
              ? t(`${translationSource}.${column.headerName}`)
              : column.headerName;

            // a function here for the operator options
            const operatorOptions = getOperatorList(type, t);

            // A function here for the options
            let options = null;
            let renderOption;
            if (type === "select") {
              options = get(column.field, modalProps);
              const optionKey =
                get("valueGetter", column)?.split(".")?.pop() || "dscrTxt";
              renderOption = (option: any) => option[optionKey];
            } else if (type === "boolean") {
              options = optionsBooleanValues(t);
            }

            return (
              filterable && (
                <div key={column.field} className="grid grid-cols-4 gap-5">
                  <DropdownField
                    id={operName}
                    renderOption={(option: any) => get("label", option)}
                    name={operName}
                    control={control}
                    options={operatorOptions}
                    label={label}
                  />
                  <div
                    className={`
                      col-span-3
                      ${
                        watchedOperator?.value === "between" &&
                        type === "date" &&
                        "grid grid-cols-2 gap-2"
                      }
                    `}
                  >
                    <FormField
                      type={type}
                      id={valName}
                      name={valName}
                      placeholder={label}
                      control={control}
                      options={options?.data || options}
                      renderOption={renderOption}
                    />
                    {watchedOperator?.value === "between" &&
                      type === "date" && (
                        <FormField
                          type={type}
                          id={`${field}_value_to`}
                          name={`${field}_value_to`}
                          placeholder={label}
                          control={control}
                          options={options?.data || options}
                          renderOption={renderOption}
                        />
                      )}
                  </div>
                </div>
              )
            );
          })}
        </div>
      </form>
    </CustomModal>
  );
};

export default FiltersModal;
