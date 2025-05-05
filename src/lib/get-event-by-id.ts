import axios from "axios";

export async function getEventById(eventId: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${eventId}`)
  const data: {
    id: number;
    venue_name: string;
    band_name: string;
    band_type: string;
    start_time_formatted: string;
    end_time: string | null;
    cover_charge: number;
    date_formatted: string;
    distance_formatted: string;
    address: string;
    genres: string[];
    tribute_band_name: string;
    other_info: string;
    distance_value: number;
    date_string: string;
    start_time_value: number;
    facebook_handle: string;
    instagram_handle: string;
    website: string;
    phone_number: string;
    band_or_venue: "Venue" | "Band/Performer";
    email_address: string;
    created_date_formatted: string;
    created_datetime: string;
    event_datetime: string;
    event_id: string;
    county: string;
    place_id: string;
  } = res.data;
  return data;
}