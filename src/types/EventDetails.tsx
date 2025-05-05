import { Dayjs } from "dayjs";
import { PlaceType } from "@/types/PlaceType";

interface EventDetails {
  venueName: string;
  bandName: string;
  bandType: string;
  tributeBandName: string;
  genres: string[];
  date: Dayjs | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  address: PlaceType | null;
  hasCoverCharge: string;
  coverCharge: string;
  otherInfo: string;
  facebookHandle: string;
  instagramHandle: string;
  venuePhoneNumber: string;
  website: string;
  bandOrVenue: string;
  emailAddress: string;
}
export default EventDetails;
