"use client";

import { Box, Stack } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import NewEventCard from "../eventCard/NewEventCard";
import { useEffect, useState } from "react";
import Event from "@/types/Event";
import dayjs from "dayjs";
import EventCalendarPicker from "./EventCalendarPicker";
import { loadVenueEvents } from "@/lib/load-venue-events";

interface VenuePageProps {
  venueName: string;
}

export default function VenuePage({ venueName }: VenuePageProps) {
  const { data: allEvents } = useSuspenseQuery({
    queryKey: [venueName],
    queryFn: () => loadVenueEvents(venueName),
  });

  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);

  const setUpcomingEvents = () => {
    const today = dayjs();
    setDisplayedEvents(
      allEvents.filter((event) => {
        return (
          today.isBefore(event.date_string, "day") ||
          today.isSame(event.date_string, "day")
        );
      })
    );
  };

  const handleDateChange = (newDate: string | undefined) => {
    if (newDate) {
      setDisplayedEvents(
        allEvents.filter((event) => event.date_string === newDate)
      );
    } else {
      setDisplayedEvents(allEvents);
    }
  };

  useEffect(() => {
    setUpcomingEvents();
  }, []);

  return (
    <Box>
      <EventCalendarPicker
        allEvents={allEvents}
        handleDateChange={handleDateChange}
      />
      <Stack direction="column" spacing={5}>
        {displayedEvents.map((event) => (
          <NewEventCard key={event.id} event={event} size="Large" />
        ))}
      </Stack>
    </Box>
  );
}
