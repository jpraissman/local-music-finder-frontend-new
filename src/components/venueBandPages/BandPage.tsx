"use client";

import { Stack } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import DisplayEventsAndCalendar from "./DisplayEventsAndCalendar";
import { loadBandEvents, loadBandInfo } from "@/lib/load-band-info";
import BandHeaderInfo from "./BandHeaderInfo";

interface BandPageProps {
  bandId: string;
  userId: string;
  userAgent: string;
}

export default function BandPage({ bandId, userId, userAgent }: BandPageProps) {
  const { data: allEvents } = useSuspenseQuery({
    queryKey: ["bandEvents", bandId],
    queryFn: () => loadBandEvents(bandId),
  });
  const { data: bandInfo } = useSuspenseQuery({
    queryKey: ["bandInfo", bandId],
    queryFn: () => loadBandInfo(bandId),
  });

  return (
    <Stack direction={"column"} spacing={{ xs: 2, md: 5 }}>
      <BandHeaderInfo bandInfo={bandInfo} />
      <DisplayEventsAndCalendar
        allEvents={allEvents}
        userId={userId}
        userAgent={userAgent}
      />
    </Stack>
  );
}
