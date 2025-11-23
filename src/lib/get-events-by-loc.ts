import Event from "@/types/Event";
import { PlaceType } from "@/newTypes/Location";
import axios from "axios";

export async function getEventsByLoc(location: string | undefined) {
  if (!location) {
    return [];
  }

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/town/${location}`
  );
  const data: Event[] = await response.data.events;
  return data;
}
