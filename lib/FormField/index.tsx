import LaunchIcon from "@mui/icons-material/Launch";
import {
  DateField,
  DropdownField,
  TextField,
  CheckboxField,
  TimeField,
  FileUploadField,
} from "../Form";
import Link from "next/link.js";
import React from "react";

type Props = {
  id: string;
  name: string;
  label?: string | undefined;
  control?: any;
  errors?: any;
  type: any;
  disabled?: boolean;
  initialValue?: any | null | undefined;
  options?: any;
  placeholder?: string;
  overrideStyle?: any;
  isLoading?: boolean;
  onChange?: any;
  helperText?: boolean;
  minDate?: string;
  indeterminate?: boolean;
  getOptionLabel?: any;
  renderOption?: any;
  multiple?: boolean;
  column?: any;
  linkTo?: (field: string) => void;
  required?: boolean;
  copyRowOn?: boolean;

  // File upload props
  maxFiles?: number;
  minSize?: number;
  maxSize?: number;
  accept?: Array<string | Record<string, string[]>>;
  fileType?: "image" | "document";
};
// Import all the components with the  and make a validation mechanism
const FormField = (props: Props) => {
  const {
    id,
    column,
    name,
    label,
    disabled,
    control,
    errors,
    type,
    initialValue,
    options,
    placeholder,
    overrideStyle,
    isLoading,
    onChange,
    helperText,
    minDate,
    indeterminate,
    getOptionLabel,
    renderOption,
    multiple,
    linkTo,
    required = false,
    copyRowOn,

    // File upload props
    maxFiles,
    minSize,
    maxSize,
    accept,
    fileType,
  } = props;

  const handleChange = (event: any) => {
    const value = event.target ? event.target.value : event; // Extract the value from the event
    onChange && onChange(event, value);
  };

  const href = linkTo ? linkTo(name) : null;

  // TODO multiple similar types: under consideration due to columns or by native code
  switch (type) {
    case "text":
    case "string":
      return (
        <TextField
          id={id}
          name={name}
          initialValue={initialValue}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          control={control}
          errors={errors}
          helperText={helperText}
          fullWidth
          onChange={handleChange}
          overrideStyle={overrideStyle}
          required={required}
          column={column}
        />
      );
    case "textArea":
      return (
        <TextField
          id={id}
          name={name}
          initialValue={initialValue}
          label={label}
          placeholder={placeholder}
          multiline
          rows={copyRowOn ? 1 : 4}
          disabled={disabled}
          control={control}
          errors={errors}
          fullWidth
          onChange={handleChange}
          overrideStyle={overrideStyle}
          required={required}
          column={column}
        />
      );
    case "number":
      return (
        <TextField
          id={id}
          name={name}
          type="number"
          initialValue={initialValue}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          control={control}
          errors={errors}
          helperText={helperText}
          fullWidth
          onChange={handleChange}
          overrideStyle={overrideStyle}
          required={required}
          column={column}
        />
      );
    case "positiveNumber":
      return (
        <TextField
          id={id}
          name={name}
          type="number"
          initialValue={initialValue}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          control={control}
          errors={errors}
          helperText={helperText}
          fullWidth
          required={required}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number(event.target.value);

            // Prevent values less than 0
            if (value < 0) {
              event.target.value = "0";
            }

            handleChange(event);
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "-" || event.key === "ArrowDown") {
              event.preventDefault();
            }
          }}
          overrideStyle={overrideStyle}
          column={column}
        />
      );

    case "select":
      // TODO jas
      return !!href && column.hyperlink ? (
        <div className="relative">
          <DropdownField
            id={id}
            name={name}
            label={label}
            disabled={disabled}
            initialValue={initialValue}
            options={options}
            placeholder={placeholder}
            control={control}
            errors={errors}
            fullWidth
            overrideStyle={overrideStyle}
            onChange={onChange}
            isLoading={isLoading}
            getOptionLabel={getOptionLabel}
            renderOption={renderOption}
            multiple={multiple}
            required={required}
          />
          <div className="absolute right-0 top-0 py-2 pr-[2rem]">
            <Link href={href}>
              <LaunchIcon />
            </Link>
          </div>
        </div>
      ) : (
        <DropdownField
          id={id}
          name={name}
          label={label}
          disabled={disabled}
          initialValue={initialValue}
          options={options}
          placeholder={placeholder}
          control={control}
          errors={errors}
          fullWidth
          onChange={onChange}
          isLoading={isLoading}
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          multiple={multiple}
          required={required}
        />
      );

    // case 'radio':
    //   return {};
    // case 'toggle':
    //   return {};
    case "checkbox":
    case "boolean":
      return (
        <CheckboxField
          id={id}
          name={name}
          label={label}
          disabled={disabled}
          control={control}
          errors={errors}
          helperText={helperText}
          indeterminate={indeterminate}
          initialValue={initialValue}
          checkboxProps={overrideStyle ? { style: overrideStyle } : undefined}
        />
      );
    case "datetime":
    case "date":
      return (
        <DateField
          initialValue={initialValue}
          name={name}
          label={label}
          disabled={disabled}
          control={control}
          errors={errors}
          helperText={helperText}
          fullWidth
          type={type}
          minDate={minDate}
          required={required}
        />
      );
    case "time":
      return (
        <TimeField
          name={name}
          label={label}
          disabled={disabled}
          control={control}
          errors={errors}
          helperText={helperText}
          fullWidth
          required={required}
        />
      );
    case "indeterminateCheckbox":
      return (
        <CheckboxField
          id={id}
          name={name}
          label={label}
          disabled={disabled}
          control={control}
          errors={errors}
          helperText={helperText}
          indeterminate={indeterminate}
          initialValue={initialValue}
          required={required}
          checkboxProps={overrideStyle ? { style: overrideStyle } : undefined}
        />
      );
    // case 'radio':
    //   return (
    //     <RadioInputField
    //       id={id}
    //       name={name}
    //       label={label}
    //       disabled={disabled}
    //       control={control}
    //       errors={errors}
    //       options={options}
    //       onChange={handleChange}
    //       required={required}
    //     />
    //   );
    case "file":
      return (
        <FileUploadField
          name={name}
          multiple={multiple}
          control={control}
          errors={errors}
          disabled={disabled}
          maxFiles={maxFiles}
          minSize={minSize}
          maxSize={maxSize}
          accept={accept}
          fileType={fileType}
        />
      );
    default:
      return (
        <div className="text-red-500">
          Unsupported type &quot;{type || "<empty>"}&quot;
        </div>
      );
  }
};

export default FormField;
