"use client";

import { useMemo, useState } from "react";
import throttle from "lodash.throttle";
import { useQuery } from "@tanstack/react-query";
import { searchVenues } from "@/api/apiCalls";

export function useVenuesSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const throttledSetSearch = useMemo(
    () =>
      throttle((newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
      }, 1000),
    []
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["searchVenues", searchTerm],
    queryFn: () => searchVenues(searchTerm),
    enabled: searchTerm.length > 0,
  });

  return {
    searchTerm,
    setSearchTerm: throttledSetSearch,
    venues: data?.venues || [],
    isVenuesLoading: isLoading,
    errorFetchingVenues: isError,
  };
}
