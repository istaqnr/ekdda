import { useState, useEffect, useRef } from "react";

interface UseTableScrollProps {
   fixedActions?: boolean;
}

export const useTableScroll = ({ fixedActions }: UseTableScrollProps) => {
   const [fixActions, setFixActions] = useState(false);
   const [fixCheckbox, setfixCheckbox] = useState(false);
   const tableContainerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleScrollOrResize = () => {
         if (tableContainerRef.current) {
            // clientWidth: Visible width of the container.
            const { scrollLeft, scrollWidth, clientWidth } = tableContainerRef.current;

            // Checks if the user has scrolled away from the left edge.
            const isScrolledRight = scrollLeft > 0;
            // Checks if the content overflows
            const isScrollable = scrollWidth > clientWidth;
            // Checks if the user has reached the end of the scrollable area
            const isAtScrollEnd = scrollLeft + clientWidth >= scrollWidth - 1;

            setfixCheckbox(isScrolledRight);

            if (isScrollable && !isAtScrollEnd) {
               setFixActions(true);
            } else {
               setFixActions(false);
            }
         }
      };

      const tableContainer = tableContainerRef.current;

      // Attach scroll event
      tableContainer?.addEventListener("scroll", handleScrollOrResize);

      // Attach resize event
      window.addEventListener("resize", handleScrollOrResize);

      // Run once after DOM/layout
      requestAnimationFrame(() => {
         handleScrollOrResize();
      });

      return () => {
         tableContainer?.removeEventListener("scroll", handleScrollOrResize);
         window.removeEventListener("resize", handleScrollOrResize);
      };
   }, [fixedActions]);

   return {
      fixActions,
      fixCheckbox,
      tableContainerRef,
   };
};
