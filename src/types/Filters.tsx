import { PlaceType } from "./PlaceType";

interface Filters {
  dateRange: string;
  address: PlaceType | undefined;
  maxDistance: string;
  genres: string[];
  bandTypes: string[];
}
export default Filters;
