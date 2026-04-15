"use client";

import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import createCache from "@emotion/cache";

export const emotionCache = createCache({ key: "mui", prepend: true });
interface Props {
   children: any;
}

export default function MuiEmotionProvider({ children }: Props) {
   return (
      <CacheProvider value={emotionCache}>
         <CssBaseline />
         {children}
      </CacheProvider>
   );
}
