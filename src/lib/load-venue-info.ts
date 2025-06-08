import Event from "@/types/Event";
import Venue from "@/types/Venue";
import axios from "axios";

export async function loadVenueEvents(venueId: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/venue/${venueId}/events`
  );
  const data: Event[] = await res.data.events;

  return data;
}

export async function loadVenueInfo(venueId: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/venue/${venueId}`);
  const data: Venue = await res.data;

  return data;
}