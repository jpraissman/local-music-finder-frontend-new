"use client";

import Event from "@/types/Event";
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
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

interface DisplayEventsAndCalendarProps {
  allEvents: Event[];
  userId: string;
  userAgent: string;
}

export default function DisplayEventsAndCalendar({
  allEvents,
  userId,
  userAgent,
}: DisplayEventsAndCalendarProps) {
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);
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
      setDate(dayjs(newDate).format("MMMM D, YYYY"));
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
              direction={"row"}
              spacing={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography sx={{ fontSize: { xs: "20px", md: "25px" } }}>
                Event Calendar
              </Typography>
              {!isMdUp && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setUpcomingEvents();
                    scrollToSection();
                  }}
                >
                  See All Events
                </Button>
              )}
            </Stack>
          }
          <EventCalendarPicker
            allEvents={allEvents}
            handleDateChange={handleDateChange}
          />
          {date !== "all" && (
            <Box sx={{ paddingTop: "10px" }}>
              <Button variant="contained" onClick={() => setUpcomingEvents()}>
                Show All Events
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
              ? `All Upcoming Events (${displayedEvents.length})`
              : `All Events on ${date} (${displayedEvents.length})`}
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
  );
}
