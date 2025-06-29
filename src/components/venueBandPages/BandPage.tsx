"use client";

import { Box, IconButton, Stack, Tab, Tabs } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import DisplayEventsAndCalendar from "./DisplayEventsAndCalendar";
import { loadBandEvents, loadBandInfo } from "@/lib/load-band-info";
import BandHeaderInfo from "./BandHeaderInfo";
import { useState } from "react";
import DisplayBandVideos from "./DisplayBandVideos";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Edit } from "@mui/icons-material";
import Link from "next/link";

interface BandPageProps {
  bandId: string;
  userId: string;
  userAgent: string;
  initialNavValue: number;
  userIsAdmin: boolean;
}

export default function BandPage({
  bandId,
  userId,
  userAgent,
  initialNavValue,
  userIsAdmin,
}: BandPageProps) {
  const { data: allEvents } = useSuspenseQuery({
    queryKey: ["bandEvents", bandId],
    queryFn: () => loadBandEvents(bandId),
  });
  const { data: bandInfo } = useSuspenseQuery({
    queryKey: ["bandInfo", bandId],
    queryFn: () => loadBandInfo(bandId),
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [navValue, setNavValue] = useState(initialNavValue);
  const handleNavChange = (
    event: React.SyntheticEvent,
    newNavValue: number
  ) => {
    setNavValue(newNavValue);

    const params = new URLSearchParams(searchParams);
    params.set("p", newNavValue.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {userIsAdmin && (
        <Box sx={{ position: "fixed", top: 100, left: 16, zIndex: 100 }}>
          <Link href={`/band/${bandId}/edit`}>
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
        sx={{ backgroundColor: "white", paddingBottom: "200px" }}
      >
        <BandHeaderInfo bandInfo={bandInfo} />
        <Box
          sx={{
            paddingTop: "10px",
            backgroundColor: "whitesmoke",
            paddingBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              maxWidth: "800px",
              paddingX: "20px",
            }}
          >
            <Tabs
              value={navValue}
              onChange={handleNavChange}
              aria-label="band page nav bar"
              color="secondary"
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab
                label="Events"
                sx={{
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  padding: { xs: "0px", md: "12px 24px" },
                }}
              />
              <Tab
                label="Videos"
                sx={{
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  padding: { xs: "0px", md: "12px 24px" },
                }}
              />
            </Tabs>
          </Box>
        </Box>
        {navValue == 0 && (
          <Box sx={{ paddingTop: "20px" }}>
            <DisplayEventsAndCalendar
              allEvents={allEvents}
              userId={userId}
              userAgent={userAgent}
              name={bandInfo.name}
              page="Band"
            />
          </Box>
        )}
        {navValue == 1 && bandInfo && (
          <Box sx={{ paddingTop: "20px" }}>
            <DisplayBandVideos bandName={bandInfo.name} bandId={bandId} />
          </Box>
        )}
      </Stack>
    </>
  );
}
