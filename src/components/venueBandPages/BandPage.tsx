"use client";

import { Box, IconButton, Stack, Tab, Tabs } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import DisplayEventsAndCalendar from "./DisplayEventsAndCalendar";
import BandHeaderInfo from "./BandHeaderInfo";
import { useState } from "react";
import DisplayBandVideos from "./DisplayBandVideos";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Edit } from "@mui/icons-material";
import Link from "next/link";
import { BandWithEventsDTO } from "@/dto/band/BandWithEvents.dto";
import { getBandById } from "@/api/apiCalls";
import dayjs from "dayjs";

interface BandPageProps {
  bandId: number;
  initialBandData: BandWithEventsDTO;
  initialNavValue: number;
  userIsAdmin: boolean;
}

export default function BandPage({
  bandId,
  initialBandData,
  initialNavValue,
  userIsAdmin,
}: BandPageProps) {
  const { data: band } = useSuspenseQuery({
    queryKey: ["getBandById", bandId],
    queryFn: () => getBandById(bandId),
    initialData: initialBandData,
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [navValue, setNavValue] = useState(initialNavValue);
  const handleNavChange = (_: React.SyntheticEvent, newNavValue: number) => {
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
        <BandHeaderInfo bandInfo={band.bandInfo} />
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
              allEvents={band.events.filter(
                (event) =>
                  dayjs(event.eventDate).isAfter(dayjs()) ||
                  dayjs(event.eventDate).isSame(dayjs())
              )}
              name={band.bandInfo.bandName}
              page="Band"
            />
          </Box>
        )}
        {navValue == 1 && band.bandInfo && (
          <Box sx={{ paddingTop: "20px" }}>
            <DisplayBandVideos bandInfo={band.bandInfo} />
          </Box>
        )}
      </Stack>
    </>
  );
}
