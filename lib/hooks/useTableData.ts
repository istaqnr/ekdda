import { get } from "lodash";
import { useEffect, useState, useMemo } from "react";
import { useQuery, useQueryClient, onlineManager } from "@tanstack/react-query";
import { useLocalStore } from "@/store/localStore";

import useFilterSortStore from "@/store/filterSortStore";
import { useAuthStore } from "@/store/authStore";
import useApiFilterSort from "./useApiFilterSort";

import { getData } from "../utils";

interface ITableData {
  queryKey: string;
  dynamicKey?: any;
  queryFn: (...p: any) => any;
  pageSize?: number | false;
  page?: number;
  staleTime?: number;
  refetchOnWindowFocus?: boolean;
  deepFilters?: any;
  defaultFilters?: any;
  defaultSort?: any;
}

const useTableData = ({
  queryKey,
  dynamicKey,
  queryFn,
  pageSize: initialPageSize = 10,
  page: initialPage = 0,
  staleTime = Infinity,
  refetchOnWindowFocus = false,
  deepFilters,
  defaultFilters,
  defaultSort,
}: ITableData): any => {
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [page, setPage] = useState(initialPage);
  const { setSelectedRow } = useLocalStore();

  const { filters } = useFilterSortStore({ queryKey });

  const { getApiFilters, getApiSort } = useApiFilterSort({
    queryKey,
    defaultFilters,
    sorts: defaultSort,
  });

  const queryClient = useQueryClient();
  const isOnline = onlineManager.isOnline();
  const { auth } = useAuthStore.getState();

  const apiFilters = getApiFilters();
  const sortString = getApiSort();

  const queryKeys = [queryKey, page, pageSize, apiFilters, sortString];
  const queryKeyParams = dynamicKey ? [...queryKeys, dynamicKey] : queryKeys;

  const {
    data: paginatedData,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: queryKeyParams,
    queryFn: () =>
      queryFn({ page, pageSize, filters: apiFilters, deepFilters, sortString }),
    staleTime,
    refetchOnWindowFocus,
    retry: 2,
    enabled: true,
  });

  const errorF =
    error || (!isOnline ? { code: 0, message: "Network error" } : undefined);

  const dataRows = getData(paginatedData);
  const summaries = paginatedData?.data?.summaries ?? null;

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onPageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  useEffect(() => {
    setPage(0);
  }, [filters]);

  const onSelectRow = (row: any) => {
    setSelectedRow(row);
  };

  const rows: any[] = useMemo(() => dataRows, [dataRows]);

  const refetchData = async () =>
    queryClient.invalidateQueries({
      queryKey: queryKeyParams,
      refetchType: "all",
    });
  const rowCount = get(paginatedData, "data.totalElements") || 0;
  const pageCount = rowCount && pageSize ? Math.ceil(rowCount / pageSize) : 1;

  return {
    rows,
    summaries,
    pagination: { pageSize, rowCount, pageCount, currentPage: page },
    onSelectRow,
    onPageChange,
    onPageSizeChange,
    isLoading,
    isFetching,
    error: errorF,
    refetchData,
    apiFilters,
  };
};

export default useTableData;
