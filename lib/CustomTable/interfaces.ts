export interface IFilterItem {
   columnField: string;
   operatorValue: string;
   value?: string | number | null | string[];
}

export interface ISortItem {
   columnField: string;
   direction: "asc" | "desc";
}

type TFilters = {
   setFilters: (filters: IFilterItem[]) => void;
   setFilter: (filter: IFilterItem) => void;
   removeFilters: () => void;
   removeFilter: (columnField: string) => void;
   getFilters: () => any;
   getFilter: (columnField: string) => any;
};

export type TSorts = {
   setSorts: (sorts: ISortItem[]) => void;
   setSort: (sort: ISortItem) => void;
   removeSorts: () => void;
   removeSort: (columnField: string) => void;
   getSorts: () => any;
   getSort: (columnField: string) => any;
};

type TFiltersStore = TFilters & { filters: { [key: string]: IFilterItem } };
type TSortsStore = TSorts & { sorts: { [key: string]: ISortItem } };

export type TFiltersSortStore = TFiltersStore & TSortsStore;
export type TFiltersSortState = TFilters & TSorts;
