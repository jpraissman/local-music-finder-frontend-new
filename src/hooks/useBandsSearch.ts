"use client";

import { useMemo, useState } from "react";
import throttle from "lodash.throttle";
import { useQuery } from "@tanstack/react-query";
import { searchBands } from "@/api/apiCalls";

export function useBandsSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const throttledSetSearch = useMemo(
    () =>
      throttle((newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
      }, 500),
    []
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["searchBands", searchTerm],
    queryFn: () => searchBands(searchTerm),
    enabled: searchTerm.length > 0,
  });

  return {
    searchTerm,
    setSearchTerm: throttledSetSearch,
    bands: data?.bands || [],
    isBandsLoading: isLoading,
    errorFetchingBands: isError,
  };
}
