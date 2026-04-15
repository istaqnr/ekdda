"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
// adjust path as needed

export default function ThemeClientProvider({ children }: { children: React.ReactNode }) {
   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         {children}
      </ThemeProvider>
   );
}
