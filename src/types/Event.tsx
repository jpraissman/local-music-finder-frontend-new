interface Event {
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
  band_or_venue: string;
  address_id: string;
  event_id: string;
  email_address: string;
  event_datetime: string;
}
export default Event;
