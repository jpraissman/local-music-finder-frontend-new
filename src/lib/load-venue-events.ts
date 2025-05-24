import Event from "@/types/Event";
import axios from "axios";

export async function loadVenueEvents(venueName: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/venue/${venueName}/events`
  );
  const data: Event[] = await res.data.events;

  return data;
}