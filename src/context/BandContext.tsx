"use client";

import { getBands } from "@/api/apiCalls";
import { BandDTO } from "@/dto/band/Band.dto";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";

type BandContextType = {
  bands: Record<string, BandDTO>;
  errorFetchingBands: boolean;
  isBandsLoading: boolean;
  refetchBands: () => void;
};

const BandContext = createContext<BandContextType | undefined>(undefined);

export const BandProvider = ({ children }: { children: ReactNode }) => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["bands"],
    queryFn: getBands,
  });

  return (
    <BandContext.Provider
      value={useMemo(
        () => ({
          bands: data?.bands || {},
          errorFetchingBands: isError,
          isBandsLoading: isPending,
          refetchBands: refetch,
        }),
        [data?.bands, isError, isPending, refetch]
      )}
    >
      {children}
    </BandContext.Provider>
  );
};

export const useBandContext = (): BandContextType => {
  const context = useContext(BandContext);

  if (!context) {
    throw new Error("useBandContext must be used within a BandProvider");
  }

  return context;
};
