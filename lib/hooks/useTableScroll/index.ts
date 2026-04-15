import { RefObject, useEffect } from "react";

export const useTableInfiniteScroll = (
   hasNextPage: boolean,
   isFetchingNextPage: boolean,
   fetchNextPage: () => void,
   tableRef: RefObject<HTMLDivElement>
) => {
   useEffect(() => {
      const handleScroll = () => {
         if (tableRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = tableRef.current;

            if (scrollHeight - scrollTop <= clientHeight * 1.5) {
               if (hasNextPage && !isFetchingNextPage && fetchNextPage) {
                  fetchNextPage();
               }
            }
         }
      };

      const currentTableRef = tableRef.current;

      if (currentTableRef) {
         currentTableRef.addEventListener("scroll", handleScroll);
      }

      return () => {
         if (currentTableRef) {
            currentTableRef.removeEventListener("scroll", handleScroll);
         }
      };
   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
};
