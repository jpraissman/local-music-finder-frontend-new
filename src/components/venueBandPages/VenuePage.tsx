"use client";

import { Stack } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { loadVenueEvents, loadVenueInfo } from "@/lib/load-venue-info";
import VenueHeaderInfo from "./VenueHeaderInfo";
import DisplayEventsAndCalendar from "./DisplayEventsAndCalendar";

interface VenuePageProps {
  venueId: string;
  userId: string;
  userAgent: string;
}

export default function VenuePage({
  venueId,
  userId,
  userAgent,
}: VenuePageProps) {
  const { data: allEvents } = useSuspenseQuery({
    queryKey: ["venueEvents", venueId],
    queryFn: () => loadVenueEvents(venueId),
  });
  const { data: venueInfo } = useSuspenseQuery({
    queryKey: ["venueInfo", venueId],
    queryFn: () => loadVenueInfo(venueId),
  });

  return (
    <Stack direction={"column"} spacing={{ xs: 2, md: 5 }}>
      <VenueHeaderInfo venueInfo={venueInfo} />
      <DisplayEventsAndCalendar
        allEvents={allEvents}
        userId={userId}
        userAgent={userAgent}
      />
    </Stack>
  );
}
