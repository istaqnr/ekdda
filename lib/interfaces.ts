import * as yup from "yup";

export interface Column {
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
}

export interface DefaultAddProps {
   columns: Column[];
   [key: string]: any;
   onConfirm: (payload: Record<string, any>) => void;
}

export interface DefaultEditProps extends DefaultAddProps {
   row: Record<string, any>;
}

export interface IFilterItem {
   columnField: string;
   operatorValue: string;
   value?: string | number | null | string[];
}

export interface AdvancedDataGridProps {
   columnsToolbar?: boolean;
   checkRowsOn: boolean;
   canEdit?: boolean;
   canDelete?: boolean;
   canView?: boolean;
   canAdd?: boolean;
}
