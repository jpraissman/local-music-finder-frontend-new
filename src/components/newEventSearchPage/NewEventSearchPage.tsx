"use client";

import { Box, Modal, Stack, Typography } from "@mui/material";
import SearchFilters from "./SearchFilters";
import { PlaceType } from "@/types/PlaceType";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Event from "@/types/Event";
import NewEventCard from "../eventCard/NewEventCard";
import { DateRange } from "react-day-picker";
import EventCardSkeleton from "../eventCard/EventCardSkeleton";
import dayjs from "dayjs";
import DisplayMissingField from "./DisplayMissingField";
import {
  DateRange as DateRangeIcon,
  LocationOn,
  MusicNote,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";
import EventsFoundHeader from "./EventsFoundHeader";
import { BAND_TYPES, GENRES } from "@/types/constants";

interface NewEventSearchPage {
  initialLocation: PlaceType | null;
  initialDateRange: DateRange | undefined;
  initialMaxDistance: number;
  initialGenres: string[];
  initialBandTypes: string[];
  userAgent: string;
  userId: string;
  initialEvents: Event[] | null;
  initialDisplayText: string | null;
}

async function getEvents(location: PlaceType | null) {
  if (!location) {
    return [];
  }

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/town/${location.description}`
  );
  const data: Event[] = await response.data.events;
  return data;
}

export default function NewEventSearchPage({
  initialLocation,
  initialDateRange,
  initialMaxDistance,
  initialGenres,
  initialBandTypes,
  userAgent,
  userId,
  initialEvents,
  initialDisplayText,
}: NewEventSearchPage) {
  const [location, setLocation] = useState<PlaceType | null>(initialLocation);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialDateRange
  );
  const [maxDistance, setMaxDistance] = useState(initialMaxDistance);
  const [genres, setGenres] = useState<string[]>(initialGenres);
  const [bandTypes, setBandTypes] = useState<string[]>(initialBandTypes);
  const [sort, setSort] = useState<"Date" | "Distance">("Date");

  const { data: events, isLoading } = useQuery({
    queryKey: ["events", location],
    queryFn: () => {
      return getEvents(location);
    },
  });

  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);
  useEffect(() => {
    if (events && dateRange) {
      const fromDate = dayjs(dateRange.from).startOf("day").subtract(1, "day");
      const toDate = dayjs(dateRange.to).startOf("day").add(1, "day");
      const genresToUse = genres.length === 0 ? GENRES : genres;
      const bandTypesToUse = bandTypes.length === 0 ? BAND_TYPES : bandTypes;
      const newDisplayedEvents = events.filter((event) => {
        const eventDate = dayjs(event.date_string).startOf("day");
        return (
          event.distance_value <= maxDistance &&
          eventDate.isAfter(fromDate) &&
          eventDate.isBefore(toDate) &&
          bandTypesToUse.includes(event.band_type) &&
          genresToUse.some((genre) => event.genres.includes(genre))
        );
      });
      const newDisplayedEventsSorted = newDisplayedEvents.sort((a, b) => {
        if (sort == "Date") {
          const dateA = dayjs(a.event_datetime);
          const dateB = dayjs(b.event_datetime);
          return dateA.isAfter(dateB) ? 1 : -1;
        } else {
          return a.distance_value - b.distance_value;
        }
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      setDisplayedEvents(newDisplayedEventsSorted);
    } else {
      setDisplayedEvents([]);
    }
  }, [events, dateRange, maxDistance, bandTypes, genres, sort]);

  const confirmLocationSet = () => {
    if (!location) {
      alert("Please enter a location before changing other filters.");
      return false;
    }
    return true;
  };

  const setDefaultDateRange = () => {
    const fromDate = new Date();
    const toDate = new Date();
    toDate.setDate(toDate.getDate() + 7);
    setDateRange({
      to: toDate,
      from: fromDate,
    });
  };

  useEffect(() => {
    if (!dateRange) {
      setDefaultDateRange();
    }
  }, []);

  return (
    <Box sx={{ paddingTop: "50px", paddingX: "20px" }}>
      <Stack direction={"row"} spacing={3}>
        <Box sx={{ width: "30%" }}>
          <Box sx={{ position: "sticky", top: "125px" }}>
            <SearchFilters
              location={location}
              setLocation={(newLocation) => setLocation(newLocation)}
              dateRange={dateRange}
              setDateRange={(newDateRange) => {
                if (confirmLocationSet()) {
                  setDateRange(newDateRange);
                }
              }}
              maxDistance={maxDistance}
              setMaxDistance={(newMaxDistance) => {
                if (confirmLocationSet()) {
                  setMaxDistance(newMaxDistance);
                }
              }}
              genres={genres}
              setGenres={(newGenres) => {
                if (confirmLocationSet()) {
                  setGenres(newGenres);
                }
              }}
              bandTypes={bandTypes}
              setBandTypes={(newBandTypes) => {
                if (confirmLocationSet()) {
                  setBandTypes(newBandTypes);
                }
              }}
              sort={sort}
              setSort={(newSort) => {
                if (confirmLocationSet()) {
                  setSort(newSort);
                }
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "70%",
          }}
        >
          {!location && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "100px",
              }}
            >
              <DisplayMissingField
                icon={
                  <LocationOn sx={{ color: "#dc2626", fontSize: "40px" }} />
                }
                header="Location Required"
                body="You must enter a location to find events in your area"
              />
            </Box>
          )}
          {location && !dateRange && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "100px",
              }}
            >
              <DisplayMissingField
                icon={
                  <DateRangeIcon sx={{ color: "#dc2626", fontSize: "40px" }} />
                }
                header="Date Range Required"
                body="You must select a date range to find events in your area"
              />
            </Box>
          )}
          {!isLoading &&
            location &&
            dateRange &&
            displayedEvents.length === 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "100px",
                }}
              >
                <DisplayMissingField
                  icon={
                    <SentimentVeryDissatisfied
                      sx={{ color: "#dc2626", fontSize: "40px" }}
                    />
                  }
                  header="No Events Found"
                  body="Try expanding your search to find events in your area."
                />
              </Box>
            )}
          {!isLoading && displayedEvents.length > 0 && (
            <Stack
              direction={"column"}
              spacing={2}
              display={"flex"}
              alignItems={"center"}
            >
              <Box sx={{ paddingBottom: "20px" }}>
                <EventsFoundHeader
                  eventCount={displayedEvents.length}
                  location={location?.description || ""}
                  startDate={dateRange?.from || new Date()}
                  endDate={dateRange?.to || new Date()}
                />
              </Box>
              {displayedEvents.map((event) => {
                return (
                  <NewEventCard
                    key={event.id}
                    event={event}
                    size="Large"
                    userAgent={userAgent}
                    userId={userId}
                  />
                );
              })}
            </Stack>
          )}
          {location && dateRange && isLoading && (
            <Stack direction={"column"} spacing={2}>
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </Stack>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
