"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import NewAddressAutocomplete from "../inputs/NewAddressAutocomplete";
import { PlaceType } from "@/types/PlaceType";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function FirstSection() {
  const [location, setLocation] = useState<PlaceType | null>(null);
  const router = useRouter();

  const findEvents = () => {
    if (location) {
      const today = dayjs().format("YYYY-MM-DD");
      const twoWeeksFromToday = dayjs().add(14, "day").format("YYYY-MM-DD");
      router.push(
        `/find/${location.description.replaceAll(
          " ",
          "-"
        )}/35-mi/${today}/${twoWeeksFromToday}/All-Genres/All-Types`
      );
    } else {
      router.push("/find");
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url(/drumset.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 1,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 2,
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 3,
        }}
      >
        <Stack
          direction="column"
          spacing={4}
          sx={{ paddingTop: "100px", paddingBottom: "90px", paddingX: "20px" }}
        >
          <Typography variant="h2" color="white" fontWeight="bold">
            Find Live Music Near You
          </Typography>
          <Typography variant="h5" color="white">
            Discover local live music events in North/Central Jersey and the
            Jersey Shore.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <NewAddressAutocomplete
              value={location}
              setValue={(newLocation: PlaceType | null) => {
                setLocation(newLocation);
              }}
              id="location-input"
              label="Enter your location"
              error={false}
              landingPage={true}
            />
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ minWidth: "250px" }}
              onClick={findEvents}
            >
              Find Music Events
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
