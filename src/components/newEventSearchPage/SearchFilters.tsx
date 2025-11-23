"use client";

import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import NewAddressAutocomplete from "../inputs/NewAddressAutocomplete";
import { DateRange, DayPicker } from "react-day-picker";
import RadioButtons from "../inputs/RadioButtons";
import CheckboxGroup from "../inputs/CheckboxGroup";
import { BAND_TYPES, GENRES } from "@/types/constants";
import MultiSelectChips from "../inputs/MultiSelectChips";

interface SearchFilterProps {
  location: string | null;
  setLocation: (newLocation: string | null) => void;
  dateRange: DateRange | undefined;
  setDateRange: (newDateRange: DateRange | undefined) => void;
  maxDistance: number;
  setMaxDistance: (newMaxDistance: number) => void;
  genres: string[];
  setGenres: (newGenres: string[]) => void;
  bandTypes: string[];
  setBandTypes: (newBandTypes: string[]) => void;
  sort: "Date" | "Distance";
  setSort: (newSort: "Date" | "Distance") => void;
  locationError: boolean;
}

export default function SearchFilters({
  location,
  setLocation,
  locationError,
  dateRange,
  setDateRange,
  maxDistance,
  setMaxDistance,
  genres,
  setGenres,
  bandTypes,
  setBandTypes,
  sort,
  setSort,
}: SearchFilterProps) {
  return (
    <Paper
      elevation={5}
      sx={{
        backgroundColor: "whitesmoke",
        padding: "20px",
        height: { xs: "100%", md: "70vh" },
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
          <Stack direction={"column"}>
            <Typography variant="h5" fontWeight={"bold"}>
              Filter & Sort
            </Typography>
            <Typography variant="h6">(scroll to see all options)</Typography>
          </Stack>
          <Stack direction={"column"} spacing={1}>
            <Typography variant="body1" fontWeight={"bold"}>
              Location
            </Typography>
            <NewAddressAutocomplete
              id="location"
              label="Your Location (town, city, or zip)"
              error={locationError}
              value={location}
              setValue={(newLocation: string | null) => {
                setLocation(newLocation);
              }}
              landingPage={true}
              helperText={locationError ? "This is required" : undefined}
            />
          </Stack>
          <Stack direction={"column"} spacing={0.5}>
            <Typography variant="body1" fontWeight={"bold"}>
              Date Range
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Stack display={"flex"} alignItems={"center"} spacing={1}>
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  disabled={{ before: new Date() }}
                  onSelect={(newDateRange) => {
                    setDateRange(newDateRange);
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ maxWidth: "200px" }}
                  onClick={() => setDateRange(undefined)}
                >
                  Clear Calendar
                </Button>
              </Stack>
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
          <Stack direction={"column"} spacing={1}>
            <Stack>
              <Typography variant="body1" fontWeight={"bold"}>
                Genres
              </Typography>
              <Typography variant="body2" color="gray">
                Click to include/remove
              </Typography>
            </Stack>
            <MultiSelectChips
              chips={GENRES}
              selectedChips={genres}
              setSelectedChips={setGenres}
            />
          </Stack>
          <Stack direction={"column"} spacing={1}>
            <Typography variant="body1" fontWeight={"bold"}>
              Band Types
            </Typography>
            <CheckboxGroup
              labels={BAND_TYPES}
              selectedLabels={bandTypes}
              setSelectedLabels={setBandTypes}
            />
          </Stack>
          <Stack
            direction={"column"}
            spacing={1}
            sx={{ paddingBottom: "100px" }}
          >
            <Typography variant="body1" fontWeight={"bold"}>
              Sort
            </Typography>
            <RadioButtons
              labels={["Date", "Distance"]}
              values={["Date", "Distance"]}
              value={sort}
              onChange={(_, newSort) => {
                if (newSort === "Date" || newSort === "Distance") {
                  setSort(newSort);
                }
              }}
            />
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}
