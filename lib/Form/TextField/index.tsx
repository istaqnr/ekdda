import React from "react";
import { Controller } from "react-hook-form";
import MuiTextField from "@mui/material/TextField";
import { InputAdornment, Tooltip } from "@mui/material";
import VerifiedIcon from "@/ui/icons/VerifiedIcon";

interface InternalTextFieldProps {
  id?: string;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: boolean;
  fullWidth?: boolean;
  verified?: boolean;
  overrideStyle?: any;
}

interface TextFieldProps {
  id?: string;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  value?: any;
  initialValue?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: boolean;
  fullWidth?: boolean;
  verified?: boolean;
  overrideStyle?: any;
  control?: any;
  errors?: any;
  column?: { valueGetter?: string };
}

const InternalTextField: React.FC<InternalTextFieldProps> = ({
  id,
  name,
  label,
  placeholder,
  type = "text",
  multiline = false,
  rows = 1,
  disabled = false,
  required,
  value,
  onChange,
  onKeyDown,
  error,
  helperText = true,
  fullWidth,
  verified = false,
  overrideStyle,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  const hasError = Boolean(error);

  return (
    <MuiTextField
      id={id}
      name={name}
      type={multiline ? undefined : type}
      label={label}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
      error={hasError}
      required={required}
      helperText={helperText ? (hasError ? error || "Error" : " ") : ""}
      sx={{
        "& .MuiInputBase-root": {
          backgroundColor: disabled ? "#f5f5f5" : "white",
        },
        "& .MuiInputBase-input.Mui-disabled": {
          color: disabled ? "#000000" : "inherit",
          WebkitTextFillColor: disabled ? "#374151" : "inherit",
        },

        "& .MuiOutlinedInput-root.Mui-disabled": {
          "& fieldset": {
            borderColor: disabled ? "#d1d5db" : "inherit",
          },
        },
        ...overrideStyle,
      }}
      multiline={multiline}
      rows={rows}
      fullWidth={fullWidth}
      slotProps={{
        input: {
          ...(verified && {
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{ opacity: disabled ? 0.8 : 1 }}
              >
                <Tooltip title="Επαληθεύτηκε">
                  <span>
                    <VerifiedIcon />
                  </span>
                </Tooltip>
              </InputAdornment>
            ),
          }),
        },
      }}
    />
  );
};

const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    id,
    name,
    label,
    placeholder,
    type = "text",
    multiline = false,
    rows = 1,
    disabled = false,
    required,
    value,
    initialValue,
    onChange,
    onKeyDown,
    error,
    helperText = true,
    fullWidth,
    verified = false,
    overrideStyle,
    control,
    errors,
    column,
  } = props;

  // React Hook Form integration
  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }: any) => {
          // Use valueGetter for objects; minimal normalization for leading segment
          let displayValue = field.value ?? initialValue;
          if (
            column?.valueGetter &&
            field.value &&
            typeof field.value === "object"
          ) {
            const keyPath = column.valueGetter.split(".").slice(1).join(".");
            displayValue = field.value[keyPath];
          }

          return (
            <InternalTextField
              id={id}
              name={name}
              type={type}
              label={label}
              placeholder={placeholder}
              value={displayValue ?? ""}
              onChange={(event) => {
                field.onChange(event);
                if (onChange) {
                  onChange(event);
                }
              }}
              onKeyDown={onKeyDown}
              disabled={disabled}
              required={required}
              multiline={multiline}
              rows={rows}
              fullWidth={fullWidth}
              overrideStyle={overrideStyle}
              verified={verified}
              error={fieldState?.error?.message}
              helperText={helperText}
            />
          );
        }}
      />
    );
  }

  // Direct usage (uncontrolled)
  return (
    <InternalTextField
      id={id}
      name={name}
      type={type}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
      required={required}
      multiline={multiline}
      rows={rows}
      fullWidth={fullWidth}
      overrideStyle={overrideStyle}
      verified={verified}
      error={error}
      helperText={helperText}
    />
  );
};

export default TextField;
