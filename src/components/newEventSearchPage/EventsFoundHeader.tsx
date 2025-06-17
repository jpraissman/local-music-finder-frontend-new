"use client";

import { DateRange, LocationOn } from "@mui/icons-material";
import { Box, Chip, Typography } from "@mui/material";

interface EventsFoundHeaderProps {
  eventCount: number;
  location: string;
  startDate: Date;
  endDate: Date;
}

export default function EventsFoundHeader({
  eventCount,
  location,
  startDate,
  endDate,
}: EventsFoundHeaderProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
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
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Chip
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
        />

        <Chip
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
        />
      </Box>
    </Box>
  );
}
