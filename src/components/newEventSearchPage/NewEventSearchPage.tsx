"use client";

import {
  Box,
  Button,
  Drawer,
  IconButton,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchFilters from "./SearchFilters";
import { useEffect, useState } from "react";
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
import { useSearchParams, useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { EventDTO } from "@/dto/event/Event.dto";
import { findEvents } from "@/api/apiCalls";

const EVENTS_PER_PAGE = 20;

interface NewEventSearchPage {
  initialLocation: string | null;
  initialDateRange: DateRange | undefined;
  initialEvents: EventDTO[] | null;
  initialLocationDisplay: string | null;
}

export default function NewEventSearchPage({
  initialLocation,
  initialDateRange,
  initialEvents,
  initialLocationDisplay,
}: NewEventSearchPage) {
  const [location, setLocation] = useState<string | null>(initialLocation);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialDateRange
  );
  const [maxDistance, setMaxDistance] = useState(initialMaxDistance);
  const [genres, setGenres] = useState<string[]>(initialGenres);
  const [bandTypes, setBandTypes] = useState<string[]>(initialBandTypes);
  const [sort, setSort] = useState<"Date" | "Distance">(initialSort);

  const { data: events, isLoading } = useQuery({
    queryKey: ["findEvents", location],
    queryFn: () => {
      return findEvents(location ?? undefined);
    },
  });

  const [displayInitialEvents, setDisplayInitialEvents] = useState(
    initialEvents ? true : false
  );
  const [displayedEvents, setDisplayedEvents] = useState<EventDTO[]>([]); // events that can be displayed to user
  const [visibleEvents, setVisibleEvents] = useState<EventDTO[]>([]); // events that are actually visible
  useEffect(() => {
    updateURL();
    if (events && dateRange) {
      const fromDate = dayjs(dateRange.from).startOf("day").subtract(1, "day");
      const toDate = dayjs(dateRange.to).startOf("day").add(1, "day");
      // const genresToUse = genres.length === 0 ? Object.values(Genre) : genres;
      // const bandTypesToUse = bandTypes.length === 0 ? Object.values(BandType) : bandTypes;
      const newDisplayedEvents = events.events.filter((event) => {
        const eventDate = dayjs(event.eventDate).startOf("day");
        return (
          event.distanceInMiles <= maxDistance &&
          eventDate.isAfter(fromDate) &&
          eventDate.isBefore(toDate)
          // &&
          // bandTypesToUse.includes(event.band.bandType) &&
          // genresToUse.some((genre) => event.band.genres.includes(genre))
        );
      });
      const newDisplayedEventsSorted = newDisplayedEvents.sort((a, b) => {
        if (sort == "Date") {
          const dateA = dayjs(`${a.eventDate} ${a.startTime}`);
          const dateB = dayjs(`${b.eventDate} ${b.startTime}`);
          return dateA.isAfter(dateB) ? 1 : -1;
        } else {
          return a.distanceInMiles - b.distanceInMiles;
        }
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      setDisplayedEvents(newDisplayedEventsSorted);
      setVisibleEvents(newDisplayedEventsSorted.slice(0, EVENTS_PER_PAGE));
    } else {
      setDisplayedEvents([]);
    }
  }, [events, dateRange, maxDistance, bandTypes, genres, sort]);

  const [displayModal, setDisplayModal] = useState(false);
  const [modalTitleText, setModalTitleText] = useState<string>("");
  // useEffect(() => {
  //   if (!initialLocation && initialLocationDisplay !== "Id Page") {
  //     setDisplayModal(true);
  //     setModalTitleText(
  //       "Enter your location to find live music events in your area"
  //     );
  //   }
  // }, []);

  const setDefaultDateRange = () => {
    const fromDate = new Date();
    const toDate = new Date();
    toDate.setDate(toDate.getDate() + 14);
    setDateRange({
      to: toDate,
      from: fromDate,
    });
  };

  const confirmLocationSet = () => {
    if (!location) {
      setModalTitleText(
        "Please enter a location before changing other filters"
      );
      setDisplayModal(true);
      return false;
    } else {
      return true;
    }
  };

  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const handleChipFilterClick = () => {
    if (isMdUp) {
      alert("Use the filters on the left to edit your search.");
    } else {
      setOpenFilterDrawer(true);
    }
  };

  useEffect(() => {
    if (!dateRange) {
      setDefaultDateRange();
    }
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();
  const updateURL = () => {
    if (location && dateRange) {
      const params = new URLSearchParams(searchParams);
      params.set("loc", location);
      params.set("from", dayjs(dateRange.from).format("YYYY-MM-DD"));
      params.set("to", dayjs(dateRange.to).format("YYYY-MM-DD"));
      params.set("dis", maxDistance.toString());
      params.set("genres", genres.join("-"));
      params.set("types", bandTypes.join("-"));
      params.set("sort", sort);
      router.replace(`/find?${params.toString()}`);
    }
  };

  const fetchMoreData = () => {
    const nextChunk = displayedEvents.slice(
      visibleEvents.length,
      visibleEvents.length + EVENTS_PER_PAGE
    );
    setVisibleEvents((prev) => [...prev, ...nextChunk]);
  };

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const FiltersComponent = (
    <SearchFilters
      location={location}
      setLocation={(newLocation) => setLocation(newLocation)}
      locationError={location === null}
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
  );

  return (
    <>
      <Box sx={{ paddingTop: "50px", paddingX: "20px" }}>
        <Stack direction={"row"} spacing={3}>
          {isMdUp && (
            <Box sx={{ maxWidth: "400px", minWidth: "400px" }}>
              <Box sx={{ position: "sticky", top: "125px" }}>
                {FiltersComponent}
              </Box>
            </Box>
          )}
          <Box
            sx={{
              width: { xs: "100%", md: "70%" },
            }}
          >
            {!displayInitialEvents && !location && (
              <DisplayMissingField
                icon={
                  <LocationOn sx={{ color: "#dc2626", fontSize: "40px" }} />
                }
                header="Location Required"
                body="You must enter a location to find events in your area"
                handleFilterClick={() => setOpenFilterDrawer(true)}
                editButtonText="Add Location"
                editButtonIcon={<LocationOn />}
              />
            )}
            {!displayInitialEvents && location && !dateRange && (
              <DisplayMissingField
                icon={
                  <DateRangeIcon sx={{ color: "#dc2626", fontSize: "40px" }} />
                }
                header="Date Range Required"
                body="You must select a date range to find events in your area"
                handleFilterClick={() => setOpenFilterDrawer(true)}
                editButtonText="Add Date Range"
                editButtonIcon={<DateRangeIcon />}
              />
            )}
            {!displayInitialEvents &&
              !isLoading &&
              location &&
              dateRange &&
              displayedEvents.length === 0 && (
                <Stack
                  direction={"column"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <EventsFoundHeader
                    eventCount={displayedEvents.length}
                    location={location || ""}
                    startDate={dateRange?.from || new Date()}
                    endDate={dateRange?.to || new Date()}
                    maxDistance={maxDistance}
                    handleFilterClick={handleChipFilterClick}
                  />
                  <DisplayMissingField
                    icon={
                      <SentimentVeryDissatisfied
                        sx={{ color: "#dc2626", fontSize: "40px" }}
                      />
                    }
                    header="No Events Found"
                    body="Try expanding your search to find events in your area."
                    handleFilterClick={() => setOpenFilterDrawer(true)}
                    editButtonText="Edit Filters"
                    editButtonIcon={<Tune />}
                  />
                </Stack>
              )}
            {!displayInitialEvents &&
              !isLoading &&
              displayedEvents.length > 0 && (
                <InfiniteScroll
                  dataLength={visibleEvents.length}
                  next={fetchMoreData}
                  hasMore={visibleEvents.length < displayedEvents.length}
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
                        eventCount={displayedEvents.length}
                        location={location || ""}
                        startDate={dateRange?.from || new Date()}
                        endDate={dateRange?.to || new Date()}
                        maxDistance={maxDistance}
                        handleFilterClick={handleChipFilterClick}
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
                    startDate={dateRange?.from || new Date()}
                    endDate={dateRange?.to || new Date()}
                    maxDistance={null}
                    handleFilterClick={handleChipFilterClick}
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
            {!displayInitialEvents && location && dateRange && isLoading && (
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
      <Modal open={displayModal} onClose={() => setDisplayModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            borderRadius: "15px",
            boxShadow: 24,
            width: "100%",
            maxWidth: { xs: "90%", sm: "300px", md: "550px" },
          }}
        >
          <Box
            sx={{ paddingX: "40px", paddingBottom: "20px", paddingTop: "50px" }}
          >
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
              spacing={2}
            >
              <IconButton
                onClick={() => setDisplayModal(false)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "red",
                }}
              >
                <Close />
              </IconButton>
              <Typography
                sx={{ fontSize: { xs: "16px", md: "18px" } }}
                component="h2"
              >
                {modalTitleText}
              </Typography>
              {/* <NewAddressAutocomplete
                id="location"
                label="Your Location (town, city, or zip)"
                error={false}
                value={location}
                setValue={(newLocation: PlaceType | null) => {
                  setDisplayModal(false);
                  setLocation(newLocation);
                }}
                landingPage={false}
              /> */}
            </Stack>
          </Box>
        </Box>
      </Modal>
      {!isMdUp && (
        <Drawer
          open={openFilterDrawer}
          onClose={() => setOpenFilterDrawer(false)}
          slotProps={{
            paper: {
              sx: { p: 0, width: "400px", maxWidth: "90%" },
            },
          }}
        >
          <Box
            sx={{ position: "relative", height: "100%", overflowY: "hidden" }}
          >
            {FiltersComponent}
            <Button
              variant="contained"
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
            color="secondary"
            onClick={() => setOpenFilterDrawer(true)}
          >
            <Stack direction={"row"} spacing={1}>
              <Tune />
              <Typography>Filter & Sort</Typography>
            </Stack>
          </Button>
        </Box>
      )}
    </>
  );
}
