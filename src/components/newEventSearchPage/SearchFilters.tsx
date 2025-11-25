"use client";

import {
  Box,
  Button,
  Divider,
  keyframes,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import NewAddressAutocomplete from "../inputs/NewAddressAutocomplete";
import { DayPicker } from "react-day-picker";
import RadioButtons from "../inputs/RadioButtons";
import { useFiltersContext } from "@/context/FiltersContext";
import MultiSelectGenreChips from "./MultiSelectGenreChips";
import BandTypeCheckboxGroup from "./BandTypeCheckboxGroup";
import React from "react";
import { FilterRefsType } from "@/hooks/useFilterRefs";

const fadeHighlight = keyframes`
  0% {
    background-color: #faf29d;
    box-shadow: 0 0 0 20px #faf29d;
  }
  100% {
    background-color: transparent;
    box-shadow: 0 0 0 20px transparent;
  }
`;

interface SearchFiltersProps {
  onManualFilterChange: () => void;
  filterRefsHook: FilterRefsType;
}

export default function SearchFilters({
  onManualFilterChange,
  filterRefsHook,
}: SearchFiltersProps) {
  const { filters, setFilters } = useFiltersContext();

  return (
    <Paper
      elevation={5}
      sx={{
        backgroundColor: "whitesmoke",
        padding: "20px",
        height: { xs: "100%", md: "70vh" },
        overflowY: "auto",
      }}
      ref={filterRefsHook.searchFiltersContainerRef}
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
              Edit Filters
            </Typography>
            <Typography variant="h6">(scroll to see all options)</Typography>
          </Stack>
          <Stack
            direction={"column"}
            spacing={1}
            ref={filterRefsHook.locationRef}
            sx={{
              animation:
                filterRefsHook.areaToHighlight === "LOCATION"
                  ? `${fadeHighlight} 3.5s ease-out`
                  : "none",
            }}
            onAnimationEnd={() => filterRefsHook.setAreaToHighlight(null)}
          >
            <Typography variant="body1" fontWeight={"bold"}>
              Location
            </Typography>
            <NewAddressAutocomplete
              id="location"
              label="Your Location (town, city, or zip)"
              value={filters.location || { address: "", locationId: "" }}
              setValue={(newLocation) => {
                setFilters({ ...filters, location: newLocation });
                onManualFilterChange();
              }}
              landingPage={true}
              error={false}
            />
          </Stack>
          <Stack
            direction={"column"}
            spacing={0.5}
            ref={filterRefsHook.dateRangeRef}
            sx={{
              animation:
                filterRefsHook.areaToHighlight === "DATE"
                  ? `${fadeHighlight} 3.5s ease-out`
                  : "none",
            }}
            onAnimationEnd={() => filterRefsHook.setAreaToHighlight(null)}
          >
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
                  selected={filters.dateRange}
                  disabled={{ before: new Date() }}
                  onSelect={(newDateRange) => {
                    setFilters({ ...filters, dateRange: newDateRange });
                    onManualFilterChange();
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ maxWidth: "200px" }}
                  onClick={() => {
                    setFilters({ ...filters, dateRange: undefined });
                    onManualFilterChange();
                  }}
                >
                  Clear Calendar
                </Button>
              </Stack>
            </Box>
          </Stack>
          <Stack
            direction={"column"}
            spacing={1}
            ref={filterRefsHook.maxDistanceRef}
            sx={{
              animation:
                filterRefsHook.areaToHighlight === "DISTANCE"
                  ? `${fadeHighlight} 3.5s ease-out`
                  : "none",
            }}
            onAnimationEnd={() => filterRefsHook.setAreaToHighlight(null)}
          >
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
              value={filters.maxDistance.toString()}
              onChange={(_, newMaxDistanceStr) => {
                setFilters({
                  ...filters,
                  maxDistance: Number(newMaxDistanceStr),
                });
                onManualFilterChange();
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
            <MultiSelectGenreChips />
          </Stack>
          <Stack direction={"column"} spacing={1}>
            <Typography variant="body1" fontWeight={"bold"}>
              Band Types
            </Typography>
            <BandTypeCheckboxGroup />
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
              value={filters.sort}
              onChange={(_, newSort) => {
                if (newSort === "Date" || newSort === "Distance") {
                  setFilters({ ...filters, sort: newSort });
                  onManualFilterChange();
                }
              }}
            />
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}
