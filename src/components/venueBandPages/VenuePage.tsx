"use client";

import { Stack } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import VenueHeaderInfo from "./VenueHeaderInfo";
import DisplayEventsAndCalendar from "./DisplayEventsAndCalendar";
import { getVenueById } from "@/api/apiCalls";
import { VenueWithEventsDTO } from "@/dto/venue/VenueWithEvents.dto";
import dayjs from "dayjs";

interface VenuePageProps {
  venueId: number;
  initialVenueData: VenueWithEventsDTO;
}

export default function VenuePage({
  venueId,
  initialVenueData,
}: VenuePageProps) {
  const { data: venue } = useSuspenseQuery({
    queryKey: ["getVenueById", venueId],
    queryFn: () => getVenueById(venueId),
    initialData: initialVenueData,
  });

  return (
    <Stack
      direction={"column"}
      spacing={{ xs: 2, md: 5 }}
      sx={{ backgroundColor: "#c8c9cc", paddingBottom: "200px" }}
    >
      <VenueHeaderInfo venueInfo={venue.venueInfo} />
      <DisplayEventsAndCalendar
        allEvents={venue.events.filter(
          (event) =>
            dayjs(event.eventDate).isAfter(dayjs()) ||
            dayjs(event.eventDate).isSame(dayjs())
        )}
        name={venue.venueInfo.venueName}
        page="Venue"
      />
    </Stack>
  );
}
