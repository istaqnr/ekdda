import { useEffect, useMemo } from "react";

export const useDscrTxtVisibility = (watch: any, setValue: any, field: string) => {
   const valueWatcher = watch(field);

   // Compute the visibility state directly from the watched value
   const onDscrTxt = useMemo(() => valueWatcher && valueWatcher.id === -9, [valueWatcher]);

   useEffect(() => {
      // Clear the description field when visibility is turned off
      if (!onDscrTxt) {
         setValue(`${field}Dscr`, "");
      }
   }, [onDscrTxt, setValue, field]);

   return onDscrTxt;
};
