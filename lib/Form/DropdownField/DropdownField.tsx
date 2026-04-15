import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { get } from "lodash";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface DropdownFieldProps {
   id?: string;
   name: string;
   label?: string;
   disabled?: boolean;
   multiple?: boolean;
   required?: boolean;
   options?: OptionsType | any;
   initialValue?: any;
   isLoading?: boolean;
   renderOption?: (option: any) => React.ReactNode;
   getOptionLabel?: (option: any) => string;
   onChange?: (value: any) => void;
   placeholder?: string;
   fullWidth?: boolean;
   overrideStyle?: any;

   // React Hook Form props (optional)
   control?: any;
   errors?: any;
}

type OptionsType =
   | Array<any> // Array of options
   | {
        data: Array<any>;
        isLoading: boolean;
        error: any;
        isFetching: boolean;
     };

const DropdownField: React.FC<DropdownFieldProps> = ({
   id,
   name,
   label = "",
   disabled = false,
   multiple = false,
   required,
   options = [],
   initialValue,
   isLoading,
   renderOption,
   getOptionLabel,
   onChange,
   placeholder,
   fullWidth = true,
   overrideStyle,
   control,
   errors,
}) => {
   // Normalize options
   const normalizedOptions = Array.isArray(options) ? options : (options as any)?.data || [];

   const [localValue, setLocalValue] = useState(initialValue ?? (multiple ? [] : null));

   // React Hook Form integration
   if (control) {
      return (
         <Controller
            name={name}
            control={control}
            render={({ field }) => {
               const fieldError = get(errors, field.name);
               const currentValue = field.value ?? (multiple ? [] : null);

               return (
                  <Autocomplete
                     id={id}
                     value={currentValue}
                     multiple={multiple}
                     disabled={disabled || isLoading}
                     options={normalizedOptions}
                     onChange={(_, value) => {
                        if (onChange) onChange(value);
                        field.onChange(value);
                     }}
                     getOptionLabel={(option) => {
                        // Always ensure we return a string
                        if (!option) return "";

                        // Check if user provided custom getOptionLabel
                        if (getOptionLabel) {
                           const result = getOptionLabel(option);
                           return result ? String(result) : "";
                        }

                        // Check if user provided custom renderOption (cast to string)
                        if (renderOption) {
                           const result = renderOption(option);
                           return result ? String(result) : "";
                        }

                        // Fallback to standard fields
                        return String(option?.dscrTxt || option?.id || "");
                     }}
                     isOptionEqualToValue={(option, value) => {
                        if (option?.id && value?.id) {
                           return option.id === value.id;
                        }
                        return normalizedOptions.indexOf(option) === normalizedOptions.indexOf(value);
                     }}
                     renderOption={(props: any, option: any) => (
                        <li {...props} key={get(option, "id") || get(option, "dscrTxt")}>
                           {renderOption ? renderOption(option) : option.dscrTxt || option.id || ""}
                        </li>
                     )}
                     renderInput={(params) => (
                        <TextField
                           {...params}
                           label={label}
                           placeholder={placeholder}
                           required={required && !isLoading}
                           error={!!fieldError}
                           helperText={fieldError?.message || " "}
                           sx={{ ...overrideStyle }}
                        />
                     )}
                  />
               );
            }}
         />
      );
   }

   // Direct usage (uncontrolled)
   const handleChange = (_: any, value: any) => {
      setLocalValue(value);
      if (onChange) onChange(value);
   };

   return (
      <Autocomplete
         id={id}
         value={localValue}
         multiple={multiple}
         disabled={disabled || isLoading}
         options={normalizedOptions}
         sx={{
            opacity: disabled ? 0.7 : 1,
         }}
         onChange={handleChange}
         getOptionLabel={(option) => {
            // Always ensure we return a string
            if (!option) return "";

            // Check if user provided custom getOptionLabel
            if (getOptionLabel) {
               const result = getOptionLabel(option);
               return result ? String(result) : "";
            }

            // Check if user provided custom renderOption (cast to string)
            if (renderOption) {
               const result = renderOption(option);
               return result ? String(result) : "";
            }

            // Fallback to standard fields
            return String(option?.dscrTxt || option?.id || "");
         }}
         isOptionEqualToValue={(option, value) => {
            if (option?.id && value?.id) {
               return option.id === value.id;
            }
            return normalizedOptions.indexOf(option) === normalizedOptions.indexOf(value);
         }}
         renderOption={(props: any, option: any) => (
            <li {...props} key={get(option, "id") || get(option, "dscrTxt")}>
               {renderOption ? renderOption(option) : option.dscrTxt || option.id || ""}
            </li>
         )}
         renderInput={(params) => (
            <TextField
               {...params}
               label={label}
               placeholder={placeholder}
               required={required && !isLoading}
               error={!!errors}
               helperText={errors?.message || " "}
               sx={{
                  ...overrideStyle,
               }}
            />
         )}
      />
   );
};

export default DropdownField;
