import { getData } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type CustomQuery = {
  queryKey: string;
  queryFn: () => Promise<any>;
  staleTime?: number; // default = 0 (always stale)
  id?: string | number;
  enabled?: boolean; // controls whether the query should be enabled
  // refetchOnWindowFocus?: boolean;
};

const useCustomQuery = ({
  queryKey,
  queryFn,
  staleTime = Infinity,
  enabled = true,
  // refetchOnWindowFocus = false,
  id,
}: CustomQuery) => {
  const queryClient = useQueryClient();

  const {
    data: _data,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: id ? [queryKey, id] : [queryKey],
    queryFn,
    staleTime,
    enabled,
    retry: 1,
  });

  const data = _data ? getData(_data) : null;

  const invalidateQuery = (newQuery?: string) =>
    queryClient.invalidateQueries({ queryKey: [newQuery ?? queryKey] });

  return { data, isError, isLoading, refetch, invalidateQuery };
};

export default useCustomQuery;
