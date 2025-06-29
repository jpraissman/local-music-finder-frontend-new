"use client";

import { Box, IconButton, Stack } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { loadVenueEvents, loadVenueInfo } from "@/lib/load-venue-info";
import VenueHeaderInfo from "./VenueHeaderInfo";
import DisplayEventsAndCalendar from "./DisplayEventsAndCalendar";
import { Edit } from "@mui/icons-material";
import Link from "next/link";

interface VenuePageProps {
  venueId: string;
  userId: string;
  userAgent: string;
  userIsAdmin: boolean;
}

export default function VenuePage({
  venueId,
  userId,
  userAgent,
  userIsAdmin,
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
    <>
      {userIsAdmin && (
        <Box sx={{ position: "fixed", top: 100, left: 16, zIndex: 100 }}>
          <Link href={`/venue/${venueId}/edit`}>
            <IconButton
              sx={{
                backgroundColor: "whitesmoke",
                "&:hover": {
                  backgroundColor: "lightgray",
                },
              }}
            >
              <Edit />
            </IconButton>
          </Link>
        </Box>
      )}
      <Stack
        direction={"column"}
        spacing={{ xs: 2, md: 5 }}
        sx={{ backgroundColor: "#c8c9cc", paddingBottom: "200px" }}
      >
        <VenueHeaderInfo venueInfo={venueInfo} />
        <DisplayEventsAndCalendar
          allEvents={allEvents}
          userId={userId}
          userAgent={userAgent}
          name={venueInfo.name}
          page="Venue"
        />
      </Stack>
    </>
  );
}
