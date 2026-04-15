import { Control } from "react-hook-form";
import React from "react";

export interface DROPDOWN_FIELD {
   id?: string;
   name: string;
   label?: string;
   errors?: any;
   control?: Control<any>;
   disabled?: boolean;
   variant?: "standard" | "filled" | "outlined";
   multiple?: boolean;
   required?: boolean;
   "data-testid"?: string;
   "data-testid-suffix"?: string;
   textFieldProps?: any;
   options: OptionsType | any;
   initialValue?: any;
   isLoading?: boolean;
   error?: any;
   renderOption?: (option: any) => React.ReactNode;
   getOptionLabel?: (option: any) => string;
   onChange?: (value: any) => void;
   placeholder?: string;
   overrideStyle?: any;
   fullWidth?: boolean;
   helperText?: boolean;
}

type OptionsType =
   | Array<any> // Array of options
   | {
        data: Array<any>;
        isLoading: boolean;
        error: any;
        isFetching: boolean;
     };

interface InputField {
   id?: string;
   name: string;
   label?: string | " " | null; // any because of example with span!!
   disabled?: boolean;
   required?: boolean;
   ["data-testid"]?: string;
   ["data-testid-suffix"]?: string;
   control?: Control<any, any>;
   errors?: any;
}

/** ****************** */
/* controlled inputs */
/** ****************** */

// common props Controlled

// controlled input types
export interface ICheckboxField extends InputField {
   wrapperProps?: any;
   labelProps?: any;
   [checkFieldPropsIndexes: string]: any;
}

export interface IRadioField extends InputField {
   options?: any[] | undefined;
   row?: boolean;
   template?: any;
   radioProps?: any;
   labelProps?: any;
   onChange?: (value: any) => void;
   getOptionLabel?: (option: any) => string;
}

export interface ITextField extends InputField {
   type?: any;
   variant?: any;
   multiline?: boolean;
   overrideStyle?: any;
   InputProps?: any;
   [textFieldPropsIndexes: string]: any;
}

export interface IDateField extends InputField {
   locale?: "en" | "el";
   disablePast?: boolean;
   disableFuture?: boolean;
   minDate?: string | Date;
   maxDate?: string | Date;
   dateFormat?: string;
   type?: "date" | "datetime";
   views?: Array<"year" | "month" | "day" | "hours" | "minutes" | "seconds">;
   variant?: "standard" | "filled" | "outlined";
   initialValue?: string | Date | null;
   helperText?: string | boolean;
   fullWidth?: boolean;
   verified?: boolean;
   overrideStyle?: any;
}

export interface ITimeField extends InputField {
   locale?: "en" | "el";
   views?: Array<"hours" | "minutes" | "seconds">;
   variant?: "standard" | "filled" | "outlined";
   ampm?: boolean;
   timeFormat?: string;
   initialValue?: string | null;
   helperText?: string | boolean;
   fullWidth?: boolean;
   timeFieldProps?: any;
}

export interface IDropdownField extends InputField {
   variant?: any;
   options?: any[] | undefined;
   multiple?: boolean;
   template?: any;
   textFieldProps?: any;
   [dropdownFieldPropsIndexes: string]: any;
}

export interface IDropdownServerSideField extends IDropdownField {
   url: string;
   minTextLength?: number;
   debounceMilliseconds?: number;
}
