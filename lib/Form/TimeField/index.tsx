import React from "react";
import { Controller } from "react-hook-form";
import { get } from "lodash";
import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/el";
import "dayjs/locale/en";
import { useTranslations } from "next-intl";
import { IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { ITimeField } from "@/lib/interfaces/formInputs";

const TimeField: React.FC<ITimeField> = ({
  name,
  label,
  errors,
  control,
  locale = "el",
  views,
  initialValue = null,
  disabled = false,
  required = false,
  ampm = false,
  timeFormat = "HH:mm",
  timeFieldProps,
  helperText,
  fullWidth = true,
}) => {
  const t = useTranslations("INDEX");

  const errorModel = get(errors, name, undefined);
  const hasError = errorModel !== undefined;

  const getInitialValue = () => {
    if (initialValue) {
      return dayjs(initialValue, timeFormat);
    }
    return null;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const value = field.value
          ? dayjs(field.value, timeFormat)
          : getInitialValue();

        return (
          <LocalizationProvider
            adapterLocale={locale}
            dateAdapter={AdapterDayjs}
          >
            <TimePicker
              {...field}
              value={value}
              onChange={(newValue: dayjs.Dayjs | null) => {
                field.onChange(newValue);
              }}
              localeText={{
                cancelButtonLabel: t("CANCEL"),
                clearButtonLabel: t("CLEAR"),
              }}
              views={views}
              label={label}
              disabled={disabled}
              format={timeFormat}
              ampm={ampm}
              slotProps={{
                textField: {
                  sx: {
                    width: fullWidth ? "100%" : "auto",
                    "& .MuiFormLabel-asterisk": { color: "red" },
                  },
                  required,
                  error: hasError,
                  helperText: hasError
                    ? get(errorModel, "message", "Error")
                    : typeof helperText === "string"
                    ? helperText
                    : " ",
                  inputProps: {
                    style: { padding: "12px" },
                  },
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        {field.value && !disabled && (
                          <IconButton
                            size="small"
                            onClick={() => field.onChange(null)}
                            edge="end"
                            tabIndex={-1}
                            aria-label="Clear time"
                          >
                            <ClearIcon />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  },
                },
                ...timeFieldProps?.slotProps,
              }}
              {...timeFieldProps}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default TimeField;
