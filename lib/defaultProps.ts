// Default styles, change it by UI Developer ;)

// const bgColor = '#1af2';
// const color = '#000';
// const colorAlt = '#058';

const bgColor = "#fff";
const color = "#112241";
const colorAlt = "#224585";

// https://mui.com/material-ui/api/autocomplete/#classes
export const dropdownComponentProps: any = {
   root: {},
   text: {
      sx: {
         "& .MuiInputLabel-outlined": {
            // backgroundColor: bgColor, //double color ? (become more darkness!)
            color,
         },
         "& .MuiAutocomplete-inputRoot": {
            backgroundColor: bgColor,
            height: "50px",
            fontSize: "16px",
         },
         "& .MuiAutocomplete-input": {
            backgroundColor: bgColor,
            color,
            borderRadius: 2,
            height: "25px",
         },
         "& .MuiInputLabel-shrink": {
            color: colorAlt,
            backgroundColor: "transparent",
            // margin: '-10px', /maybe better UI ?
         },
      },
      variant: "outlined",
      // size: 'small',
   },
   input: {
      // this one will change all above!
      // className: 'text-gray-50',
   },
};

// export const textComponentProps: any = {
//   root: {
//     variant: 'outlined',
//     color: 'primary',
//     sx: {
//       input: { color, backgroundColor: bgColor, p: 1.5, m: 0 },
//       '& .MuiFormLabel-asterisk': {
//         color: 'red',
//       },
//     },
//   },
//   input: {
//     //not work well especially with sx
//     //className: 'text-red-600',
//   },
// };

export const dateComponentProps: any = {
   root: {
      sx: { input: { color, backgroundColor: bgColor, p: 1.5, m: 0 } },
   },
   input: {
      // not work well especially with sx
      // className: 'text-lime-500',
   },
};

export const buttonComponentProps: any = {
   root: {
      color: "primary",
      variant: "contained",
      sx: {
         "&.Mui-disabled": {
            opacity: 0.6,
         },
         textTransform: "none",
      },
   },
};

export const buttonIconComponentProps: any = {
   root: {
      color: "primary",
      size: "medium",
      // className: 'text-blue-700', //will override the color
      sx: {
         "&.Mui-disabled": {
            opacity: 0.6,
         },
      },
   },
   icon: {
      sx: { fontSize: "1.5rem" },
   },
};

export const checkboxComponentProps: any = {
   wrapper: { className: "py-1" },
   label: { labelPlacement: "end", classes: { label: "text-blue-700" } }, // underline
   input: {
      // color: 'warning',
      sx: {
         color: colorAlt,
         "& .MuiSvgIcon-root": { fontSize: 32 },
         "&.Mui-checked": {
            color: "#08f",
         },
      },
   },
};

export const uploadfileComponentProps: any = {
   root: {
      className: "flex w-max flex-col",
   },
   wrapper: {
      className:
         "dropzone inline-flex rounded-md border-2 border-dashed bg-slate-100 py-1 pl-1 pr-2 gap-2 items-center border-gray-400 w-max",
      classNameOnDrag: "!border-red-400",
   },
   filenameWrapper: { className: "flex flex-col w-40 text-indigo-600" },
   filename: { className: "text-ellipsis overflow-hidden " }, // h-[32px]
   placeholder: {
      className: "py-2 italic text-slate-500 text-ellipsis overflow-hidden",
   },
   uploadIcon: { iconProps: { sx: { fontSize: 32 } } },
   clearIcon: { iconProps: { sx: { fontSize: 24 } } },
};
