import React from "react";
import { Controller } from "react-hook-form";
import { get } from "lodash";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/el";
import "dayjs/locale/en";
import { useTranslations } from "next-intl";
import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import VerifiedIcon from "@/ui/icons/VerifiedIcon";
import { IDateField } from "@/lib/interfaces/formInputs";

const DateField: React.FC<IDateField> = ({
  name,
  label,
  errors,
  control,
  locale = "el",
  type = "date",
  views,
  initialValue = null,
  disabled = false,
  disablePast = false,
  disableFuture = false,
  minDate,
  maxDate,
  required = false,
  dateFormat,
  helperText,
  verified = false,
  overrideStyle,
}) => {
  const t = useTranslations("INDEX");

  const errorModel = get(errors, name, undefined);
  const hasError = errorModel !== undefined;

  const getInitialValue = () => {
    if (initialValue) {
      return dayjs(initialValue);
    }
    return null;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const value = field.value ? dayjs(field.value) : null;
        const isDateTime = type === "datetime";
        const PickerComponent = isDateTime ? DateTimePicker : DatePicker;

        return (
          <LocalizationProvider
            adapterLocale={locale}
            dateAdapter={AdapterDayjs}
          >
            <PickerComponent
              name={field.name}
              value={value}
              onChange={(newValue: dayjs.Dayjs | null) => {
                field.onChange(newValue);
              }}
              localeText={{
                cancelButtonLabel: t("CANCEL"),
                clearButtonLabel: t("CLEAR"),
                todayButtonLabel: t("TODAY"),
              }}
              views={
                views?.filter((view) =>
                  ["year", "month", "day"].includes(view)
                ) as any
              }
              label={label}
              disabled={disabled}
              format={dateFormat}
              closeOnSelect
              disablePast={disablePast}
              disableFuture={disableFuture}
              minDate={minDate ? dayjs(minDate) : undefined}
              maxDate={maxDate ? dayjs(maxDate) : undefined}
              openTo="day"
              slotProps={{
                textField: (params: any) => ({
                  ...params,
                  required,
                  error: hasError,
                  helperText: helperText
                    ? get(errorModel, "message", " ")
                    : " ",
                  inputProps: {
                    ...params.inputProps,
                    style: { padding: "12px" },
                  },
                  InputProps: {
                    ...params.InputProps,
                    endAdornment: (
                      <InputAdornment position="end">
                        {value && !disabled && (
                          <IconButton
                            size="small"
                            onClick={() => {
                              field.onChange(null);
                            }}
                            edge="end"
                            tabIndex={-1}
                            sx={{
                              marginRight: "-10px",
                              color: "rgba(0, 0, 0, 0.54)",
                              "&:hover": {
                                color: "rgba(0, 0, 0, 0.87)",
                              },
                            }}
                          >
                            <ClearIcon fontSize="medium" />
                          </IconButton>
                        )}
                        {params.InputProps?.endAdornment}
                        {verified && (
                          <span
                            style={{
                              marginLeft: 8,
                              opacity: disabled ? 0.8 : 1,
                            }}
                          >
                            <Tooltip title="Επαληθεύτηκε">
                              <span>
                                <VerifiedIcon />
                              </span>
                            </Tooltip>
                          </span>
                        )}
                      </InputAdornment>
                    ),
                  },
                }),
              }}
              sx={{
                ...overrideStyle,
                ".MuiInputBase-root": {
                  backgroundColor: "white",
                  height: "55px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cccccc",
                  },
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default DateField;
