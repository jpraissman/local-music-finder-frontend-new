"use client";

import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EventCalendarPicker from "./EventCalendarPicker";
import NewEventCard from "../eventCard/NewEventCard";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { EventDTO } from "@/dto/event/Event.dto";

interface DisplayEventsAndCalendarProps {
  allEvents: EventDTO[];
  name: string;
  page: "Venue" | "Band";
}

export default function DisplayEventsAndCalendar({
  allEvents,
  name,
  page,
}: DisplayEventsAndCalendarProps) {
  const [displayedEvents, setDisplayedEvents] = useState<EventDTO[]>([]);
  const [date, setDate] = useState<string>("all");

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const scrollToSection = () => {
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  };

  const setUpcomingEvents = () => {
    const today = dayjs();
    setDisplayedEvents(
      allEvents.filter((event) => {
        return (
          today.isBefore(event.eventDate, "day") ||
          today.isSame(event.eventDate, "day")
        );
      })
    );
    setDate("all");
  };

  const handleDateChange = (newDate: string | undefined) => {
    if (newDate) {
      setDisplayedEvents(
        allEvents.filter(
          (event) => dayjs(event.eventDate).format("YYYY-MM-DD") === newDate
        )
      );
      setDate(dayjs(newDate).format("MMMM D"));
    } else {
      setDisplayedEvents(allEvents);
    }
    if (!isMdUp) {
      scrollToSection();
    }
  };

  useEffect(() => {
    setUpcomingEvents();
  }, []);

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
      <Box
        sx={{
          width: { xs: "100%", md: "500px" },
          display: "flex",
          justifyContent: "center",
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
          {
            <Stack
              direction={"column"}
              spacing={0.5}
              sx={{
                display: "flex",
                alignItems: "center",
                paddingX: "40px",
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontSize: { xs: "20px", md: "25px" } }}>
                {isMdUp ? "Event Calendar" : `${name}'s Upcoming Events`}
              </Typography>
              <Typography variant="body1" color="gray">
                Click on calendar to see events
              </Typography>
            </Stack>
          }
          <EventCalendarPicker
            allEvents={allEvents}
            handleDateChange={handleDateChange}
          />
          {date !== "all" && (
            <Box sx={{ paddingTop: "10px" }}>
              <Button variant="contained" onClick={() => setUpcomingEvents()}>
                {`Show ${page}'s Upcoming Events (all)`}
              </Button>
            </Box>
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
          <Typography sx={{ fontSize: { xs: "20px", md: "25px" } }}>
            {date === "all"
              ? `All Upcoming Events for ${page} (${displayedEvents.length})`
              : `${page}'s events on ${date} (${displayedEvents.length})`}
          </Typography>
          <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
            {displayedEvents.map((event) => (
              <NewEventCard
                key={event.id}
                event={event}
                size={isLgUp ? "Large" : "Small"}
              />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
