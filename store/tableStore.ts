import { create } from "zustand";
import isNil from "lodash/fp/isNil";
import * as yup from "yup";
interface Column {
   field: string;
   headerName: string;
   width?: number;
   type: string;
   disabled?: boolean;
   sortable?: boolean;
   filterable?: boolean;
   valueGetter?: string;
   validation?: yup.AnyObject;
   initialHidden?: boolean;
   minDateField?: string;
   value?: any;
   multipleValue?: boolean;
   modalSpan?: number;
}

type TableStore = {
   selectedRow: any;
   setSelectedRow: (selectedRow: any) => void;

   expandedRow: any;
   setExpandedRow: (expandedRow: any) => void;

   checkedRows: any[];
   setCheckedRows: (checkedRows: any) => void;

   createdRows: any[];
   setCreatedRows: (newRow: any) => void;

   updatedRows: any[];
   setUpdatedRows: (newRow: any) => void;

   deletedRows: any[];
   setDeletedRows: (deletedRow: any) => void;

   updatedFields: any[];

   addUpdatedField: (editableField: any) => void;
   undoCheckedRow: (checkedRows: any) => void;
   clearTableRows: () => void;

   visibleColumns: Record<string, Column[]>;
   toggleColumn: (key: string, column: Column) => void;
   setVisibleColumns: (key: string, column: Column[]) => void;
};

export const useTableStore = create<TableStore>((set, get) => ({
   selectedRow: null,
   setSelectedRow: (selectedRow: any) =>
      set((state) => {
         if (state.selectedRow === selectedRow) return state;
         return { selectedRow };
      }),

   expandedRow: null,
   setExpandedRow: (expandedRow: any) =>
      set((state) => {
         // Only update if the value actually changed
         if (state.expandedRow === expandedRow) return state;
         return { expandedRow };
      }),

   checkedRows: [],
   setCheckedRows: (checkedRows: any) =>
      set((state) => {
         // Avoid rerender if arrays are referentially equal
         if (state.checkedRows === checkedRows) return state;
         return { checkedRows };
      }),

   createdRows: [],
   // setCreatedRows: (createdRows: any) => set({ createdRows }),
   setCreatedRows: (createdRows) => set({ createdRows }),

   updatedRows: [],
   // setUpdatedRows: (updatedRows: any) => set({ updatedRows }),
   setUpdatedRows: (updatedRows) =>
      set({
         updatedRows,
         // tableFormRows: [...get().createdRows, ...updatedRows],
      }),

   deletedRows: [],
   setDeletedRows: (deletedRow: any) =>
      // TODO jas when I delete the row and have one edited already it must be removed
      set((state) => {
         const updatedFields = state.updatedFields.filter((item) => item.row.id !== deletedRow.id);
         return { deletedRows: [...state.deletedRows, deletedRow], updatedFields };
      }),

   updatedFields: [],

   addUpdatedField: (editableField: any): any =>
      set((state): any => ({
         updatedFields: [...state.updatedFields, editableField],
      })),
   addEditableRow: (editableField: any): any =>
      set((state): any => ({
         updatedFields: [...state.updatedFields, editableField],
      })),

   undoCheckedRow: (): any =>
      set((state): any => {
         const checkedRowsIds = new Set(state.checkedRows.map((item) => item.id));

         const filteredEditable = state.updatedFields.filter(
            (item: any) => !checkedRowsIds?.has(item.row.id)
         );
         const filteredDeletedRows = state.deletedRows.filter((item: any) => !checkedRowsIds?.has(item.id));
         const filteredUpdatedRows = state.updatedRows.filter((item: any) => !checkedRowsIds?.has(item.id));
         return {
            updatedFields: filteredEditable,
            updatedRows: filteredUpdatedRows,
            deletedRows: filteredDeletedRows,
            checkedRows: [],
         };
      }),

   clearAllEditableFields: (): any =>
      set((state): any => {
         state.setCheckedRows([]);
         return {
            updatedFields: [],
         };
      }),
   clearTableRows: () => ({
      updatedFields: [],
      updatedRows: [],
      deletedRows: [],
      checkedRows: [],
   }),

   visibleColumns: {},
   toggleColumn: (key, column) =>
      set((state) => {
         if (isNil(state.visibleColumns[key])) {
            return {
               visibleColumns: {
                  ...state.visibleColumns,
                  [key]: [column],
               },
            };
         }

         const foundColumn = state.visibleColumns[key].some((c) => c.field === column.field);
         if (foundColumn) {
            //We do not let the user uncheck the last one
            // if (state.visibleColumns[key].length === 1) {
            //   customToast({ type: 'error', payload: 'ERROR.MUST_HAVE_ONE_COLUMN' });
            //   return state.visibleColumns;
            // }

            const filteredColumns = state.visibleColumns[key].filter((c) => c.field !== column.field);
            return {
               visibleColumns: {
                  ...state.visibleColumns,
                  [key]: filteredColumns,
               },
            };
         }
         return {
            visibleColumns: {
               ...state.visibleColumns,
               [key]: [...state.visibleColumns[key], column],
            },
         };
      }),

   setVisibleColumns: (key, columns) =>
      set((state) => {
         // const foundColumn = state.visibleColumns[key].some(c => c.field === column.field);
         return {
            visibleColumns: {
               ...state.visibleColumns,
               [key]: columns,
            },
         };
      }),
}));
