import { DateRange } from "react-day-picker";
import { Genre } from "./Genre";
import { BandType } from "./BandType";

export type SearchFiltersType = {
  location: string | null;
  dateRange: DateRange | undefined;
  maxDistance: number;
  genres: Genre[];
  bandTypes: BandType[];
  sort: "Date" | "Distance";
};
