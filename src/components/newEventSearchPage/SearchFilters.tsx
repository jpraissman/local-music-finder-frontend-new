"use client";

import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import NewAddressAutocomplete from "../inputs/NewAddressAutocomplete";
import { PlaceType } from "@/types/PlaceType";
import { DateRange, DayPicker } from "react-day-picker";
import RadioButtons from "../inputs/RadioButtons";
import { useState } from "react";

interface SearchFilterProps {
  location: PlaceType | null;
  setLocation: (newLocation: PlaceType | null) => void;
  dateRange: DateRange | undefined;
  setDateRange: (newDateRange: DateRange | undefined) => void;
  maxDistance: number;
  setMaxDistance: (newMaxDistance: number) => void;
}

export default function SearchFilters({
  location,
  setLocation,
  dateRange,
  setDateRange,
  maxDistance,
  setMaxDistance,
}: SearchFilterProps) {
  return (
    <Paper
      elevation={5}
      sx={{
        backgroundColor: "whitesmoke",
        padding: "20px",
        height: "70vh",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Stack
          direction={"column"}
          spacing={2}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <Typography variant="h5">Filters</Typography>
          <Stack direction={"column"} spacing={1}>
            <Typography variant="body1" fontWeight={"bold"}>
              Location
            </Typography>
            <NewAddressAutocomplete
              id="location"
              label="Your Location (town, city, or zip)"
              error={false}
              value={location}
              setValue={(newLocation: PlaceType | null) => {
                setLocation(newLocation);
              }}
              landingPage={false}
            />
          </Stack>
          <Stack direction={"column"} spacing={0.5}>
            <Typography variant="body1" fontWeight={"bold"}>
              Date
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <DayPicker
                mode="range"
                selected={dateRange}
                disabled={{ before: new Date() }}
                onSelect={(newDateRange) => {
                  setDateRange(newDateRange);
                }}
              />
            </Box>
          </Stack>
          <Stack direction={"column"} spacing={1}>
            <Typography variant="body1" fontWeight={"bold"}>
              Distance
            </Typography>
            <RadioButtons
              values={["5", "10", "20", "35", "50"]}
              labels={[
                "Within 5 miles",
                "Within 10 miles",
                "Within 20 miles",
                "Within 35 miles",
                "Within 50 miles",
              ]}
              value={maxDistance.toString()}
              onChange={(_, newMaxDistanceStr) => {
                setMaxDistance(Number(newMaxDistanceStr));
              }}
            />
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}
