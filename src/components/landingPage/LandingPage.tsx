"use client";

import { Box, Stack } from "@mui/material";
import FirstSection from "./FirstSection";
import SectionSection from "./SecondSection";
import NewEventCard from "../eventCard/NewEventCard";
import Event from "@/types/Event";

const exampleEvent: Event = {
  id: 1,
  venue_name: "The Velvet Groove",
  band_name: "Neon Sunrise",
  band_type: "Tribute Band",
  start_time_formatted: "8:30 PM",
  end_time: "11:00 PM",
  cover_charge: 0,
  date_formatted: "Friday, May 17",
  distance_formatted: "5.2 miles away",
  address: "Wayne, NJ",
  genres: ["Indie Rock", "Synthpop", "Rock", "Classic Rock", "Blues"],
  tribute_band_name: "The Beatles",
  other_info: "21+ show, outdoor patio open, drink specials all night.",
  distance_value: 8.36,
  date_string: "2025-05-17",
  start_time_value: 2030,
  facebook_handle: "https://www.thelocalmusicfinder.com/post",
  instagram_handle: "",
  website: "thelocalmusicfinder.com",
  phone_number: "(732) 555-1234",
  band_or_venue: "band",
  address_id: "addr_abc123",
  event_id: "evt_xyz456",
  email_address: "contact@neonsunriseband.com",
  event_datetime: "2025-05-17T20:30:00-04:00",
  youtube_id: "",
  ranking_position: 1,
  town: "Wayne, NJ",
};

const exampleEvent2: Event = {
  id: 1,
  venue_name: "The Velvet Groove",
  band_name: "Neon Sunrise",
  band_type: "Tribute Band",
  start_time_formatted: "8:30 PM",
  end_time: "11:00 PM",
  cover_charge: 0,
  date_formatted: "Friday, May 17",
  distance_formatted: "5.2 miles away",
  address: "Wayne, NJ",
  genres: ["Indie Rock", "Synthpop", "Rock", "Classic Rock", "Blues"],
  tribute_band_name: "The Beatles",
  other_info: "21+ show, outdoor patio open, drink specials all night.",
  distance_value: 8.36,
  date_string: "2025-05-17",
  start_time_value: 2030,
  facebook_handle: "https://www.thelocalmusicfinder.com/post",
  instagram_handle: "",
  website: "thelocalmusicfinder.com",
  phone_number: "(732) 555-1234",
  band_or_venue: "band",
  address_id: "addr_abc123",
  event_id: "evt_xyz456",
  email_address: "contact@neonsunriseband.com",
  event_datetime: "2025-05-17T20:30:00-04:00",
  youtube_id: "OjTNQNr7LA8",
  ranking_position: 2,
  town: "Wayne, NJ",
};

const exampleEvent3: Event = {
  id: 1,
  venue_name: "The Velvet Groove",
  band_name: "Neon Sunrise",
  band_type: "Tribute Band",
  start_time_formatted: "8:30 PM",
  end_time: "11:00 PM",
  cover_charge: 0,
  date_formatted: "Friday, May 17",
  distance_formatted: "5.2 miles away",
  address: "Wayne, NJ",
  genres: ["Indie Rock", "Synthpop", "Rock", "Classic Rock", "Blues"],
  tribute_band_name: "The Beatles",
  other_info: "21+ show, outdoor patio open, drink specials all night.",
  distance_value: 8.36,
  date_string: "2025-05-17",
  start_time_value: 2030,
  facebook_handle: "https://www.thelocalmusicfinder.com/post",
  instagram_handle: "",
  website: "thelocalmusicfinder.com",
  phone_number: "(732) 555-1234",
  band_or_venue: "band",
  address_id: "addr_abc123",
  event_id: "evt_xyz456",
  email_address: "contact@neonsunriseband.com",
  event_datetime: "2025-05-17T20:30:00-04:00",
  youtube_id: "",
  ranking_position: 3,
  town: "Wayne, NJ",
};

export default function LandingPage() {
  return (
    <Stack direction="column" spacing={2}>
      <FirstSection />
      <SectionSection />
      <Stack
        direction="column"
        spacing={5}
        sx={{ paddingX: "25px", paddingTop: "50px", maxWidth: "1200px" }}
      >
        <NewEventCard event={exampleEvent} />
        <NewEventCard event={exampleEvent2} />
        <NewEventCard event={exampleEvent3} />
      </Stack>
    </Stack>
  );
}
