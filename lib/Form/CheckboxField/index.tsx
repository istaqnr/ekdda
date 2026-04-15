import React, { useState } from "react";
import { Controller } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

interface InternalCheckboxProps {
   id?: string;
   name: string;
   label?: string;
   disabled?: boolean;
   required?: boolean;
   indeterminate?: boolean;
   checked?: boolean;
   onChange?: (checked: boolean) => void;
   error?: string;
   helperText?: boolean;
   wrapperProps?: any;
   labelProps?: any;
   checkboxProps?: any;
}

interface CheckboxFieldProps {
   id?: string;
   name: string;
   label?: string;
   disabled?: boolean;
   required?: boolean;
   indeterminate?: boolean;
   checked?: boolean;
   initialValue?: any;
   onChange?: (checked: boolean) => void;
   error?: string;
   helperText?: boolean;
   wrapperProps?: any;
   labelProps?: any;
   checkboxProps?: any;
   control?: any;
   errors?: any;
}

const InternalCheckboxField: React.FC<InternalCheckboxProps> = ({
   id,
   name,
   label,
   disabled = false,
   required = false,
   indeterminate = false,
   checked = false,
   onChange,
   error,
   helperText = true,
   wrapperProps,
   labelProps,
   checkboxProps,
}) => {
   const hasText = Boolean(label || required);
   const hasError = Boolean(error);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
         onChange(event.target.checked);
      }
   };

   return (
      <Box {...wrapperProps}>
         <FormControlLabel
            id={id}
            name={name}
            label={label}
            disabled={disabled}
            required={required}
            sx={{
               "& .MuiTypography-root": { color: "black" },
               "&.Mui-disabled .MuiTypography-root": {
                  color: "rgba(0, 0, 0, 0.38)",
               },
            }}
            {...labelProps}
            control={
               <Checkbox
                  checked={checked}
                  indeterminate={indeterminate}
                  onChange={handleChange}
                  disabled={disabled}
                  style={{
                     paddingTop: hasText ? 0 : 2,
                     paddingBottom: hasText ? 0 : 2,
                     ...checkboxProps?.style,
                  }}
                  {...checkboxProps}
               />
            }
         />
         {helperText && (
            <FormHelperText
               error={hasError}
               style={{
                  margin: 0,
                  paddingLeft: hasText ? 10 : 5,
                  visibility: hasError ? "visible" : "hidden",
               }}
            >
               {error || " "}
            </FormHelperText>
         )}
      </Box>
   );
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({
   name,
   label,
   disabled = false,
   required = false,
   indeterminate = false,
   checked,
   initialValue = false,
   onChange,
   error,
   helperText = true,
   wrapperProps,
   labelProps,
   checkboxProps,
   control,
   errors,
   id,
}) => {
   const [internalValue, setInternalValue] = useState(initialValue);
   // Use controlled value if provided, otherwise use internal state
   const isControlled = checked !== undefined;
   const checkboxValue = isControlled ? checked : internalValue;

   // React Hook Form integration
   if (control) {
      return (
         <Controller
            name={name}
            control={control}
            defaultValue={initialValue ?? false}
            render={({ field }: any) => (
               <InternalCheckboxField
                  id={id}
                  name={name}
                  label={label}
                  disabled={disabled}
                  required={required}
                  indeterminate={indeterminate}
                  onChange={field.onChange}
                  checked={field.value ?? false}
                  wrapperProps={wrapperProps}
                  labelProps={labelProps}
                  checkboxProps={checkboxProps}
                  error={errors?.[name]?.message}
                  helperText={helperText}
               />
            )}
         />
      );
   }

   // Direct usage (controlled or uncontrolled)
   const handleChange = (newValue: boolean) => {
      if (!isControlled) {
         setInternalValue(newValue);
      }
      if (onChange) {
         onChange(newValue);
      }
   };

   return (
      <InternalCheckboxField
         id={id}
         name={name}
         label={label}
         disabled={disabled}
         required={required}
         indeterminate={indeterminate}
         checked={checkboxValue}
         onChange={handleChange}
         wrapperProps={wrapperProps}
         labelProps={labelProps}
         checkboxProps={checkboxProps}
         error={error}
         helperText={helperText}
      />
   );
};

export default CheckboxField;
