import Band from "@/types/Band";
import Event from "@/types/Event";
import axios from "axios";

export async function loadBandEvents(bandId: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/band/${bandId}/events`
  );
  const data: Event[] = await res.data.events;

  return data;
}

export async function loadBandInfo(bandId: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/band/${bandId}`);
  const data: Band = await res.data;

  return data;
}