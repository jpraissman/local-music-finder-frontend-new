"use client";

import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import NewEventCard from "../eventCard/NewEventCard";
import { useEffect, useState } from "react";
import Event from "@/types/Event";
import dayjs from "dayjs";
import EventCalendarPicker from "./EventCalendarPicker";
import { loadVenueEvents, loadVenueInfo } from "@/lib/load-venue-info";
import VenueInfo from "./VenueInfo";
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

  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);
  const [date, setDate] = useState<string>("all");

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

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
    setDate("all");
  };

  const handleDateChange = (newDate: string | undefined) => {
    if (newDate) {
      setDisplayedEvents(
        allEvents.filter((event) => event.date_string === newDate)
      );
      setDate(dayjs(newDate).format("MMMM D"));
    } else {
      setDisplayedEvents(allEvents);
    }
  };

  useEffect(() => {
    setUpcomingEvents();
  }, []);

  return (
    <Stack direction={"column"} spacing={5}>
      <VenueInfo venueInfo={venueInfo} />
      <Stack direction={"row"}>
        <Box
          sx={{
            width: "500px",
          }}
        >
          <Stack
            direction={"column"}
            spacing={1}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Event Calendar</Typography>
            <EventCalendarPicker
              allEvents={allEvents}
              handleDateChange={handleDateChange}
            />
            {date !== "all" && (
              <Button variant="contained" onClick={() => setUpcomingEvents()}>
                Show All Events
              </Button>
            )}
          </Stack>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Stack
            direction={"column"}
            spacing={3}
            sx={{
              display: "flex",
              alignItems: "center",
              paddingX: "20px",
            }}
          >
            <Typography variant="h5">
              {date === "all"
                ? `Upcoming Events at ${venueInfo.name} (${displayedEvents.length})`
                : `Events on ${date} (${displayedEvents.length})`}
            </Typography>
            <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
              {displayedEvents.map((event) => (
                <NewEventCard
                  key={event.id}
                  event={event}
                  size={isLgUp ? "Large" : "Small"}
                  userId={userId}
                  userAgent={userAgent}
                />
              ))}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
