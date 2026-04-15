"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGenParamsStore } from "@/store/genParamsStore"; // Your zustand store
import { getData } from "@/lib/utils";

const useGenParamsByKey = (key: string, fetchApiData: any) => {
  // Get Zustand store methods for accessing and setting data
  const { genParams, setGenParams } = useGenParamsStore();
  const { locale } = useParams();

  const [initialLocale, setInitialLocale] = useState(locale);

  const queryFn = async () => {
    const response = await fetchApiData();
    const res = getData(response);
    setGenParams(key, res); // Update Zustand store with fetched data
    return res;
  };

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: [key, locale],
    queryFn, // Query function to fetch data
    initialData: genParams[key],
    // Check if Zustand store has already the data first
    staleTime: Infinity,
    retry: 2,
  });

  useEffect(() => {
    if (locale !== initialLocale) {
      refetch();
      setInitialLocale(locale);
    }
  }, [locale, refetch]);

  const results = { data, isLoading: isLoading || isFetching, error };
  return results;
};

export default useGenParamsByKey;
