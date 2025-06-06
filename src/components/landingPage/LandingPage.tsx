"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import FirstSection from "./FirstSection";
import SectionSection from "./SecondSection";
import Event from "@/types/Event";
import NewEventCard from "../eventCard/NewEventCard";
import Link from "next/link";

export default function LandingPage({
  upcomingEvents,
  userAgent,
  userId,
}: {
  upcomingEvents: Event[];
  userAgent: string;
  userId: string;
}) {
  return (
    <Stack direction="column" spacing={2}>
      <FirstSection />
      <SectionSection />
      <Box
        sx={{
          paddingTop: "50px",
          paddingX: "25px",
          backgroundColor: "rgba(244, 241, 241, 0.98)",
          paddingBottom: "100px",
        }}
      >
        <Stack
          direction="column"
          spacing={8}
          sx={{ display: "flex", alignItems: "center", width: "100%" }}
        >
          <Typography variant="h4" fontWeight="bold">
            Upcoming Events
          </Typography>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={5}
            sx={{ width: "100%" }}
          >
            {upcomingEvents.map((event) => {
              return (
                <NewEventCard
                  event={event}
                  size="Small"
                  key={event.id}
                  userId={userId}
                  userAgent={userAgent}
                />
              );
            })}
          </Stack>
          <Link href="/events">
            <Button
              variant="contained"
              size="large"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              View All Upcoming Events
            </Button>
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
}
