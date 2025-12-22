"use client";

import {
  Box,
  Button,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchFilters from "./SearchFilters";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NewEventCard from "../eventCard/NewEventCard";
import { DateRange } from "react-day-picker";
import EventCardSkeleton from "../eventCard/EventCardSkeleton";
import dayjs from "dayjs";
import DisplayMissingField from "./DisplayMissingField";
import {
  Close,
  DateRange as DateRangeIcon,
  LocationOn,
  SentimentVeryDissatisfied,
  Tune,
} from "@mui/icons-material";
import EventsFoundHeader from "./EventsFoundHeader";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { EventDTO } from "@/dto/event/Event.dto";
import { findEvents } from "@/api/apiCalls";
import { DateRangeValues, useFiltersContext } from "@/context/FiltersContext";
import { LocationDTO } from "@/dto/location/Location.dto";
import { Genre } from "@/newTypes/Genre";
import { BandType } from "@/newTypes/BandType";
import { useFilterRefs } from "@/hooks/useFilterRefs";
import { SearchContext, useAnalyticsContext } from "@/context/AnalyticsContext";

const EVENTS_PER_PAGE = 20;

interface NewEventSearchPage {
  initialLocation?: LocationDTO | "BLANK";
  initialDateRange?: DateRangeValues | DateRange;
  initialEvents?: EventDTO[] | null;
  initialLocationDisplay?: string | null;
}

export default function NewEventSearchPage({
  initialLocation,
  initialDateRange,
  initialEvents,
  initialLocationDisplay,
}: NewEventSearchPage) {
  const { filters, setFilters, setDateRangeWithString } = useFiltersContext();
  const { sendSearchUserEvent, addSessionActivity } = useAnalyticsContext();

  useEffect(() => {
    if (initialLocation) {
      const locationToUse =
        initialLocation === "BLANK" ? null : initialLocation;
      setFilters((prev) => ({ ...prev, location: locationToUse }));
      if (locationToUse) {
        sendSearchUserEvent(
          locationToUse.locationId,
          SearchContext.LOCATION_LINK
        );
      }
    }
  }, [initialLocation, setFilters]);

  useEffect(() => {
    if (initialDateRange) {
      if (typeof initialDateRange === "string") {
        setDateRangeWithString(initialDateRange);
      } else {
        setFilters((prev) => ({ ...prev, dateRange: initialDateRange }));
      }
    }
  }, [initialDateRange, setFilters, setDateRangeWithString]);

  const { data: events, isLoading } = useQuery({
    queryKey: ["findEvents", filters.location?.locationId],
    queryFn: () => {
      return findEvents(filters.location?.locationId);
    },
  });

  useEffect(() => {
    if (!isLoading) {
      addSessionActivity(
        `The events available to the user have changed. There are now ${events?.length} available events.`
      );
    }
  }, [events, isLoading]);

  const [displayInitialEvents, setDisplayInitialEvents] = useState(
    initialEvents ? true : false
  );
  const [availableEvents, setAvailableEvents] = useState<EventDTO[]>([]); // events that can be displayed to user
  const [visibleEvents, setVisibleEvents] = useState<EventDTO[]>([]); // events that are actually visible

  const router = useRouter();
  const filterRefsHook = useFilterRefs();

  const handleManualFilterChange = useCallback(() => {
    setDisplayInitialEvents(false);
    router.replace(`/find`);
    filterRefsHook.setAreaToHighlight(null);
  }, [router, filterRefsHook]);

  useEffect(() => {
    if (events && filters.dateRange) {
      const fromDate = dayjs(filters.dateRange.from)
        .startOf("day")
        .subtract(1, "day");
      const toDate = dayjs(filters.dateRange.to).startOf("day").add(1, "day");
      const genresToUse =
        filters.genres.length === 0 ? Object.values(Genre) : filters.genres;
      const bandTypesToUse =
        filters.bandTypes.length === 0
          ? Object.values(BandType)
          : filters.bandTypes;
      const newAvailableEvents = events.filter((event) => {
        const eventDate = dayjs(event.eventDate).startOf("day");
        return (
          (!event.distanceInMiles ||
            event.distanceInMiles <= filters.maxDistance) &&
          eventDate.isAfter(fromDate) &&
          eventDate.isBefore(toDate) &&
          bandTypesToUse.includes(event.band.bandType) &&
          genresToUse.some((genre) => event.band.genres.includes(genre))
        );
      });
      const newAvailableEventsSorted = newAvailableEvents.sort((a, b) => {
        if (filters.sort == "Date") {
          const dateA = dayjs(`${a.eventDate} ${a.startTime}`);
          const dateB = dayjs(`${b.eventDate} ${b.startTime}`);
          return dateA.isAfter(dateB) ? 1 : -1;
        } else {
          return a.distanceInMiles && b.distanceInMiles
            ? a.distanceInMiles - b.distanceInMiles
            : 0;
        }
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      setAvailableEvents(newAvailableEventsSorted);
      setVisibleEvents(newAvailableEventsSorted.slice(0, EVENTS_PER_PAGE));
    } else {
      setAvailableEvents([]);
    }
  }, [events, filters]);

  const fetchMoreData = () => {
    const nextChunk = availableEvents.slice(
      visibleEvents.length,
      visibleEvents.length + EVENTS_PER_PAGE
    );
    addSessionActivity(
      `User scrolled through events. ${nextChunk.length} more events were loaded.`
    );
    setVisibleEvents((prev) => [...prev, ...nextChunk]);
  };

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const handleFilterClick = useCallback(() => {
    if (!isMdUp) {
      setOpenFilterDrawer(true);
    }
  }, [isMdUp]);

  return (
    <>
      <Box sx={{ paddingTop: "50px", paddingX: "20px" }}>
        <Stack direction={"row"} spacing={3}>
          {isMdUp && (
            <Box sx={{ maxWidth: "400px", minWidth: "400px" }}>
              <Box sx={{ position: "sticky", top: "125px" }}>
                <SearchFilters
                  onManualFilterChange={handleManualFilterChange}
                  filterRefsHook={filterRefsHook}
                />
              </Box>
            </Box>
          )}
          <Box
            sx={{
              width: { xs: "100%", md: "70%" },
            }}
          >
            {!displayInitialEvents && !filters.location && (
              <DisplayMissingField
                icon={
                  <LocationOn sx={{ color: "#dc2626", fontSize: "40px" }} />
                }
                header="Location Required"
                body="You must enter a location to find events in your area"
                handleFilterClick={handleFilterClick}
                editButtonText="Add Location"
                editButtonIcon={<LocationOn />}
                filterSectionToOpen="LOCATION"
                filterRefsHook={filterRefsHook}
              />
            )}
            {!displayInitialEvents &&
              filters.location &&
              !filters.dateRange && (
                <DisplayMissingField
                  icon={
                    <DateRangeIcon
                      sx={{ color: "#dc2626", fontSize: "40px" }}
                    />
                  }
                  header="Date Range Required"
                  body="You must select a date range to find events in your area"
                  handleFilterClick={handleFilterClick}
                  editButtonText="Add Date Range"
                  editButtonIcon={<DateRangeIcon />}
                  filterRefsHook={filterRefsHook}
                  filterSectionToOpen="DATE"
                />
              )}
            {!displayInitialEvents &&
              !isLoading &&
              filters.location &&
              filters.dateRange &&
              availableEvents.length === 0 && (
                <Stack
                  direction={"column"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <EventsFoundHeader
                    eventCount={availableEvents.length}
                    location={filters.location.address || ""}
                    startDate={filters.dateRange?.from || new Date()}
                    endDate={filters.dateRange?.to || new Date()}
                    maxDistance={filters.maxDistance}
                    onFilterClick={handleFilterClick}
                    filterRefsHook={filterRefsHook}
                  />
                  <DisplayMissingField
                    icon={
                      <SentimentVeryDissatisfied
                        sx={{ color: "#dc2626", fontSize: "40px" }}
                      />
                    }
                    header="No Events Found"
                    body="Try expanding your search to find events in your area."
                    handleFilterClick={handleFilterClick}
                    editButtonText="Edit Filters"
                    editButtonIcon={<Tune />}
                    filterRefsHook={filterRefsHook}
                    filterSectionToOpen={null}
                  />
                </Stack>
              )}
            {!displayInitialEvents &&
              !isLoading &&
              availableEvents.length > 0 && (
                <InfiniteScroll
                  dataLength={visibleEvents.length}
                  next={fetchMoreData}
                  hasMore={visibleEvents.length < availableEvents.length}
                  loader={<h4>Loading...</h4>}
                >
                  <Stack
                    direction={"column"}
                    spacing={2}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Box sx={{ paddingBottom: "20px" }}>
                      <EventsFoundHeader
                        eventCount={availableEvents.length}
                        location={filters.location?.address || ""}
                        startDate={filters.dateRange?.from || new Date()}
                        endDate={filters.dateRange?.to || new Date()}
                        maxDistance={filters.maxDistance}
                        onFilterClick={handleFilterClick}
                        filterRefsHook={filterRefsHook}
                      />
                    </Box>

                    {visibleEvents.map((event) => {
                      return (
                        <NewEventCard
                          key={event.id}
                          event={event}
                          size={isLgUp ? "Large" : "Small"}
                        />
                      );
                    })}
                  </Stack>
                </InfiniteScroll>
              )}
            {displayInitialEvents && initialEvents && (
              <Stack
                direction={"column"}
                spacing={2}
                display={"flex"}
                alignItems={"center"}
              >
                <Box sx={{ paddingBottom: "20px" }}>
                  <EventsFoundHeader
                    eventCount={initialEvents.length}
                    location={initialLocationDisplay || ""}
                    startDate={filters.dateRange?.from || new Date()}
                    endDate={filters.dateRange?.to || new Date()}
                    maxDistance={null}
                    onFilterClick={handleFilterClick}
                    filterRefsHook={filterRefsHook}
                  />
                </Box>
                {initialEvents.map((event) => {
                  return (
                    <NewEventCard
                      key={event.id}
                      event={event}
                      size={isLgUp ? "Large" : "Small"}
                    />
                  );
                })}
              </Stack>
            )}
            {!displayInitialEvents &&
              filters.location &&
              filters.dateRange &&
              isLoading && (
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
      {!isMdUp && (
        <Drawer
          open={openFilterDrawer}
          onClose={() => setOpenFilterDrawer(false)}
          slotProps={{
            paper: {
              sx: { p: 0, width: "400px", maxWidth: "90%" },
            },
          }}
          onTransitionEnd={() => {
            if (filterRefsHook.pendingScrollAndHighlight) {
              filterRefsHook.doScrollAndHighlight(
                filterRefsHook.pendingScrollAndHighlight
              );
            }
          }}
        >
          <Box
            sx={{ position: "relative", height: "100%", overflowY: "hidden" }}
          >
            <SearchFilters
              onManualFilterChange={handleManualFilterChange}
              filterRefsHook={filterRefsHook}
            />
            <Button
              variant="contained"
              color="success"
              sx={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                width: "200px",
              }}
              onClick={() => setOpenFilterDrawer(false)}
            >
              Apply Filters
            </Button>
          </Box>
        </Drawer>
      )}
      {!isMdUp && (
        <Box sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 100 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleFilterClick}
          >
            <Stack direction={"row"} spacing={1}>
              <Tune />
              <Typography>Edit Filters</Typography>
            </Stack>
          </Button>
        </Box>
      )}
    </>
  );
}
