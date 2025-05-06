import { DateRange } from "react-day-picker";
import { PlaceType } from "./PlaceType";

interface Filters {
  dateRange: DateRange | undefined;
  address: PlaceType | undefined;
  maxDistance: string;
  genres: string[];
  bandTypes: string[];
}
export default Filters;
