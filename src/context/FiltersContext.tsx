"use client";

import {
  createContext,
  ReactNode,
  useCallback,
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

export type DateRangeValues = "NEXT_7_DAYS" | "NEXT_30_DAYS";

const convertDateRangeValueToNumber = (dateRangeValue: DateRangeValues) => {
  switch (dateRangeValue) {
    case "NEXT_7_DAYS":
      return 7;
    case "NEXT_30_DAYS":
      return 30;
  }
};

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
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  setDateRangeWithString: (dateRangeString: DateRangeValues) => void;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

const defaultFilters: FiltersType = {
  location: null,
  dateRange: undefined,
  maxDistance: 20,
  genres: [],
  bandTypes: [],
  sort: "Date",
};

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FiltersType>(defaultFilters);

  useEffect(() => {
    Cookies.set("locationId", filters.location?.locationId ?? "", {
      expires: 365,
    });
    Cookies.set("locationString", filters.location?.address ?? "", {
      expires: 365,
    });
  }, [filters.location]);

  const setDateRangeWithString = useCallback(
    (dateRangeString: DateRangeValues) => {
      const daysToAdd = convertDateRangeValueToNumber(dateRangeString);
      const fromDate = new Date();
      const toDate = new Date();
      toDate.setDate(toDate.getDate() + daysToAdd);
      const newDateRange: DateRange = {
        to: toDate,
        from: fromDate,
      };
      setFilters((prev) => ({ ...prev, dateRange: newDateRange }));
    },
    [setFilters]
  );

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

    setFilters((prev) => ({
      ...prev,
      location: location,
      dateRange: defaultDateRange,
    }));
  }, []);

  return (
    <FiltersContext.Provider
      value={useMemo(
        () => ({
          filters,
          setFilters,
          setDateRangeWithString,
        }),
        [filters, setDateRangeWithString, setFilters]
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
