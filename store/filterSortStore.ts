import { keyBy } from "lodash";
import { create, useStore, UseBoundStore, StoreApi } from "zustand";

// The overall pattern of creating and caching stores in a global object (filterSortStore) can lead to issues, especially with Server-Side Rendering (SSR) and potential memory leaks. In SSR, the global object would be shared across different user requests, causing data contamination. Stores are also never cleaned up, so the cache can grow indefinitely.

const filterSortStore: Record<string, UseBoundStore<StoreApi<any>>> = {};

const useFilterSortStore = ({ queryKey }: { queryKey: string }) => {
   const store = initializeStore({ queryKey });
   // Call the store hook here to subscribe the component to state changes.
   return useStore(store);
};

const initializeStore = ({ queryKey }: any): UseBoundStore<StoreApi<any>> => {
   if (!filterSortStore[queryKey]) {
      filterSortStore[queryKey] = create((set: any) => ({
         sorts: {},
         filters: {},
         setFilters: (filters: any) => {
            set(() => ({ filters: keyBy(filters, "columnField") }));
         },
         removeFilter: (columnField: any) => {
            set((state: any) => {
               const { [columnField]: removedFilter, ...restOfFilters } = state.filters;
               return { filters: restOfFilters };
            });
         },
         setSorts: (sorts: any) => {
            set({
               sorts: keyBy(sorts, "columnField"),
            });
         },
         removeSort: (columnField: string) => {
            set((state: any) => {
               const { [columnField]: removedSort, ...restOfSorts } = state.sorts;
               return { sorts: restOfSorts };
            });
         },
         // clearFilters: () => {
         //   set(() => ({ filters: {} }));
         // },
         // clearSorts: () => {
         //   set(() => ({ sorts: {} }));
         // },
      }));
   }

   return filterSortStore[queryKey];
};

export default useFilterSortStore;
