import { createTheme } from "@mui/material/styles";

const theme = createTheme({
   palette: {
      primary: {
         main: "rgba(0, 52, 118, 1)",
      },
   },
   typography: {
      fontFamily: "var(--font-cf-asty), sans-serif",
   },
   components: {
      MuiButton: {
         defaultProps: {
            variant: "contained",
            color: "primary",
            size: "medium",
         },
         styleOverrides: {
            root: {
               textTransform: "none",
            },
         },
      },
      MuiIconButton: {
         defaultProps: {
            color: "primary",
            size: "medium",
         },
         styleOverrides: {
            root: {
               textTransform: "none",
               color: "#616161",
               "&.Mui-disabled": {
                  opacity: 0.6,
               },
            },
         },
      },

      MuiFormControl: {
         styleOverrides: {
            root: {
               width: "100%",
               "& .MuiFormLabel-asterisk": {
                  color: "red",
               },
               "& .Mui-disabled .MuiFormLabel-asterisk": {
                  color: "gray",
               },
            },
         },
      },
      MuiTextField: {
         styleOverrides: {
            root: {
               "& .MuiInputBase-root": {
                  color: "#555555",
                  backgroundColor: "transparent", // Ensure consistent background
               },
               "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "oklch(96.8% 0.007 247.896)",
               },
               "& .MuiInputBase-input.Mui-disabled": {
                  color: "#777777 !important", // Force black text when disabled
                  WebkitTextFillColor: "#555555 ",
               },
               "& .MuiFormLabel-root.Mui-disabled": {
                  color: "#333333",
               },
            },
         },
      },
      MuiAutocomplete: {
         styleOverrides: {
            root: {
               "& .MuiInputBase-root": {
                  color: "#333333",
                  backgroundColor: "transparent", // Ensure consistent background
               },
               "& .MuiInputBase-input": {
                  color: "#333333", // Darker font color for autocomplete inputs
               },
               "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "oklch(96.8% 0.007 247.896)",
                  color: "#333333", // Darker font color for autocomplete inputs
                  "& .MuiOutlinedInput-notchedOutline": {
                     borderColor: "#cccccc",
                  },
               },
               "& .MuiFormLabel-root.Mui-disabled": {
                  color: "#777777",
               },
            },
         },
      },
      MuiInputBase: {
         styleOverrides: {
            root: {
               color: "#333333",
               "&.Mui-disabled": {
                  backgroundColor: "#f3f3f3",
               },
            },
         },
      },
      MuiToolbar: {
         styleOverrides: {
            root: {
               padding: "0px !important",
               minHeight: "auto !important",
            },
         },
      },
   },
});

export default theme;
