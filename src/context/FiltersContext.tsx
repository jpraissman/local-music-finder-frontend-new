"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie";
import { LocationDTO } from "@/dto/location/Location.dto";
import { DateRange } from "react-day-picker";
import { Genre } from "@/newTypes/Genre";
import { BandType } from "@/newTypes/BandType";

interface FiltersType {
  location: LocationDTO | null;
  dateRange: DateRange | undefined;
  maxDistance: number;
  genres: Genre[];
  bandTypes: BandType[];
  sort: "Date" | "Distance";
}

type FiltersContextType = {
  filters: FiltersType;
  setFilters: (newFilters: FiltersType) => void;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

const defaultFilters: FiltersType = {
  location: null,
  dateRange: undefined,
  maxDistance: 20,
  genres: [],
  bandTypes: [],
  sort: "Distance",
};

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FiltersType>(defaultFilters);

  useEffect(() => {
    const locationId = Cookies.get("locationId") ?? null;
    const address = Cookies.get("locationString") ?? null;
    const location: LocationDTO | null =
      locationId && address
        ? {
            locationId: locationId,
            address: address,
          }
        : null;

    const fromDate = new Date();
    const toDate = new Date();
    toDate.setDate(toDate.getDate() + 14);
    const defaultDateRange: DateRange = {
      to: toDate,
      from: fromDate,
    };

    setFilters({ ...filters, location: location, dateRange: defaultDateRange });
  }, []);

  return (
    <FiltersContext.Provider
      value={useMemo(
        () => ({
          filters,
          setFilters: (newFilters: FiltersType) => {
            Cookies.set("locationId", newFilters.location?.locationId ?? "", {
              expires: 365,
            });
            Cookies.set("locationString", newFilters.location?.address ?? "", {
              expires: 365,
            });
            setFilters(newFilters);
          },
        }),
        [filters]
      )}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = (): FiltersContextType => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error("useFiltersContext must be used within a FiltersProvider");
  }

  return context;
};
