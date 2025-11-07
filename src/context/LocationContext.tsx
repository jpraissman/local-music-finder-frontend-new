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

type AdditionalLocationInfo = {
  latitude?: number;
  longitude?: number;
  county?: string;
  town?: string;
};

type LocationContextType = {
  location: string | null;
  setLocation: (value: string | null) => void;
  additionalLocationInfo: AdditionalLocationInfo;
  setAdditionalLocationInfo: (value: AdditionalLocationInfo) => void;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<string | null>(null);
  const [additionalLocationInfo, setAdditionalLocationInfo] =
    useState<AdditionalLocationInfo>({});

  useEffect(() => setLocation(Cookies.get("location") ?? null), []);

  return (
    <LocationContext.Provider
      value={useMemo(
        () => ({
          location,
          setLocation: (value: string | null) => {
            Cookies.set("location", value ?? "", { expires: 365 });
            setLocation(value);
          },
          additionalLocationInfo,
          setAdditionalLocationInfo,
        }),
        [
          location,
          setLocation,
          additionalLocationInfo,
          setAdditionalLocationInfo,
        ]
      )}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = (): LocationContextType => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider"
    );
  }

  return context;
};
