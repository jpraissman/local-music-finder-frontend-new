"use client";

import { DateRange, LocationOn, Map, Tune } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface EventsFoundHeaderProps {
  eventCount: number;
  location: string;
  startDate: Date;
  endDate: Date;
  maxDistance: number | null;
  handleFilterClick: () => void;
}

export default function EventsFoundHeader({
  eventCount,
  location,
  startDate,
  endDate,
  maxDistance,
  handleFilterClick,
}: EventsFoundHeaderProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {location !== "Id Page" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
            borderColor: "divider",
            backgroundColor: "background.paper",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              color: "black",
            }}
          >
            {eventCount} {eventCount === 1 ? "Event" : "Events"} Found
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 1.5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Chip
              clickable={isMdUp ? false : true}
              icon={<LocationOn sx={{ fontSize: "20px !important" }} />}
              label={location}
              variant="outlined"
              sx={{
                "& .MuiChip-label": {
                  fontSize: "1rem",
                  fontWeight: 500,
                },
                paddingX: "5px",
                borderColor: "primary.main",
                color: "primary.main",
              }}
              onClick={isMdUp ? () => {} : handleFilterClick}
            />
            {maxDistance && (
              <Chip
                clickable={isMdUp ? false : true}
                icon={<Map sx={{ fontSize: "20px !important" }} />}
                label={`Within ${maxDistance.toString()} miles`}
                variant="outlined"
                sx={{
                  "& .MuiChip-label": {
                    fontSize: "1rem",
                    fontWeight: 500,
                  },
                  paddingX: "5px",
                  borderColor: "primary.main",
                  color: "primary.main",
                }}
                onClick={isMdUp ? () => {} : handleFilterClick}
              />
            )}
            <Chip
              clickable={isMdUp ? false : true}
              icon={<DateRange sx={{ fontSize: "20px !important" }} />}
              label={`${formatDate(startDate)} - ${formatDate(endDate)}`}
              variant="outlined"
              sx={{
                "& .MuiChip-label": {
                  fontSize: "1rem",
                  fontWeight: 500,
                },
                paddingX: "5px",
                borderColor: "primary.main",
                color: "primary.main",
              }}
              onClick={isMdUp ? () => {} : handleFilterClick}
            />
          </Box>
          {!isMdUp && (
            <Box sx={{ paddingTop: "10px" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleFilterClick}
              >
                <Stack direction={"row"} spacing={1}>
                  <Tune />
                  <Typography>All Filters</Typography>
                </Stack>
              </Button>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
