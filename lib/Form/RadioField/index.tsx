import React from "react";
import { Controller } from "react-hook-form";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, FormHelperText } from "@mui/material";

import getOr from "lodash/fp/getOr";
import isString from "lodash/fp/isString";
import isNumber from "lodash/fp/isNumber";
import isObject from "lodash/fp/isObject";

// import { IRadioField } from '@/qnrLib/interfaces';

interface Option {
   value: string | number;
   label?: string;
   dscrTxt?: string;
   id?: string | number;
}

const RadioField: React.FC<any> = ({
   id,
   name,
   label,
   options = [],
   control,
   errors,
   getOptionLabel,
   labelProps,
   radioProps,
   row = false,
   disabled = false,
   "data-testid": dataTestId,
}) => {
   const error = getOr(undefined, name, errors);

   const optionValue = (option: string | number | Option): string | number => {
      if (isString(option) || isNumber(option)) {
         return option.toString();
      }
      if (isObject(option)) {
         return option?.value || option?.id || "";
      }
      return "";
   };

   const optionLabel = (option: string | number | Option): string | number => {
      if (getOptionLabel) {
         return getOptionLabel(option);
      }
      if (isString(option)) {
         return option;
      }
      if (isObject(option)) {
         return option.label || option.dscrTxt || option.id || "";
      }
      return "";
   };

   const optionChecked = (value: any, option: any): boolean => optionValue(option) === optionValue(value);

   return (
      <FormControl component="fieldset" error={error} disabled={disabled} data-testid={dataTestId}>
         <FormLabel component="legend">{label}</FormLabel>
         <Controller
            name={name}
            control={control}
            render={({ field }) => (
               <RadioGroup row={row}>
                  {options.map((option: any) => (
                     <FormControlLabel
                        key={optionValue(option)}
                        value={optionValue(option)}
                        control={
                           <Radio
                              checked={optionChecked(field?.value, option)}
                              onChange={() => {
                                 field?.onChange && field?.onChange(option);
                              }}
                              {...radioProps}
                           />
                        }
                        label={optionLabel(option)}
                        {...labelProps}
                     />
                  ))}
               </RadioGroup>
            )}
         />
         {error && <FormHelperText>{getOr("Error", "message", error)}</FormHelperText>}
      </FormControl>
   );
};

export default RadioField;
