"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import NewAddressAutocomplete from "../inputs/NewAddressAutocomplete";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFiltersContext } from "@/context/FiltersContext";
import { SearchContext, useAnalyticsContext } from "@/context/AnalyticsContext";

export default function FirstSection() {
  const { filters, setFilters } = useFiltersContext();
  const { sendSearchUserEvent } = useAnalyticsContext();
  const [locationError, setLocationError] = useState(false);
  const router = useRouter();

  const findEvents = () => {
    if (filters.location) {
      router.push("/find");
      sendSearchUserEvent(filters.location.locationId, SearchContext.HOME_PAGE);
    } else {
      setLocationError(true);
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
              value={filters.location ?? { address: "", locationId: "" }}
              setValue={(newLocation) => {
                setFilters((prev) => ({ ...prev, location: newLocation }));
              }}
              id="location-input"
              label="Enter your location"
              error={locationError}
              landingPage={true}
              helperText={locationError ? "This is required" : undefined}
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
