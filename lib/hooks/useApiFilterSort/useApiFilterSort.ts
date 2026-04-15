import { useEffect, useState } from "react";
import { get } from "lodash";
import useFilterSortStore from "@/store/filterSortStore";
import { IFilterItem, ISortItem } from "../../interfaces/global";

interface IuseApiFilterSortBase {
  filters?: IFilterItem[];
  defaultFilters?: IFilterItem[];
  sorts?: ISortItem[];
}

interface IuseApiFilterSortStore {
  queryKey: string;
  state?: never;
  setState?(): never;
}

type IuseApiFilterSort = IuseApiFilterSortStore & IuseApiFilterSortBase;

const useApiFilterSort = ({
  queryKey,
  filters: filtersProp,
  defaultFilters: defaultFiltersProp,
  sorts: sortsProp,
}: IuseApiFilterSort) => {
  const [defaultFilters, setDefaultFilters] = useState<IFilterItem[]>();
  const { filters, sorts, setFilters, setSorts, removeSort } =
    useFilterSortStore({
      queryKey,
    });

  useEffect(() => {
    // give the oportunity to keep previous states, when is null/undefined (for example after redirect)
    if (defaultFiltersProp) setDefaultFilters(defaultFiltersProp);
    if (filtersProp) setFilters(filtersProp);
    if (sortsProp) setSorts(sortsProp);
  }, []);

  const toggleSort = ({
    columnField,
    direction,
  }: {
    columnField: string;
    direction?: "asc" | "desc" | null;
  }): void => {
    if (direction === null) {
      removeSort(columnField);
      return;
    }

    const currentDirection = sorts[columnField]?.direction;

    if (currentDirection === "asc") {
      setSorts([{ columnField, direction: "desc" }]);
    } else if (currentDirection === "desc") {
      removeSort(columnField);
    } else {
      setSorts([{ columnField, direction: "asc" }]);
    }
  };

  const getApiFilters = () => {
    const filterItems = Object.values(filters);
    const results: any = {
      defaultItems: defaultFilters || [],
      items: filterItems || [],
    };
    if (filterItems?.length) {
      results.linkOperator = "and";
    }
    return results;
  };

  const getApiSort = () => {
    const sortString = Object.values(sorts)
      .map((sort) => {
        const fieldAttr = get(sort, "columnField");
        const direction = get(sort, "direction", "")?.toUpperCase();
        return `${fieldAttr}:${direction}`;
      })
      .join(",");
    return sortString;
  };

  return { getApiFilters, toggleSort, getApiSort };
};

export default useApiFilterSort;
