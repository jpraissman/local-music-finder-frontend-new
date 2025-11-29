"use client";

import { getVenues } from "@/api/apiCalls";
import { VenueDTO } from "@/dto/venue/Venue.dto";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";

type VenueContextType = {
  venues: Record<string, VenueDTO>;
  errorFetchingVenues: boolean;
  isVenuesLoading: boolean;
  refetchVenues: () => void;
};

const VenueContext = createContext<VenueContextType | undefined>(undefined);

export const VenueProvider = ({ children }: { children: ReactNode }) => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["venues"],
    queryFn: getVenues,
  });

  return (
    <VenueContext.Provider
      value={useMemo(
        () => ({
          venues: data?.venues || {},
          errorFetchingVenues: isError,
          isVenuesLoading: isPending,
          refetchVenues: refetch,
        }),
        [data?.venues, isError, isPending, refetch]
      )}
    >
      {children}
    </VenueContext.Provider>
  );
};

export const useVenueContext = (): VenueContextType => {
  const context = useContext(VenueContext);

  if (!context) {
    throw new Error("useVenueContext must be used within a VenueProvider");
  }

  return context;
};
