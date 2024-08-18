import PlaceType from "@/types/PlaceType";

interface Filters {
  dateRange: string;
  address: PlaceType | null;
  maxDistance: string;
  genres: string[];
  bandTypes: string[];
}
export default Filters;
