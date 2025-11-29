"use client";

import { useAdminApi } from "@/hooks/useAdminApi";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import AdminEventCard from "./AdminEventCard";
import { useVenueContext } from "@/context/VenueContext";
import { useBandContext } from "@/context/BandContext";
import { VenueDTO } from "@/dto/venue/Venue.dto";
import { BandDTO } from "@/dto/band/Band.dto";
import { BandTypeLabels } from "@/newTypes/BandType";

export default function AdminSearch() {
  const { allFutureEventsQuery } = useAdminApi();
  const allFutureEvents = allFutureEventsQuery.data?.events;

  const { venues } = useVenueContext();
  const { bands } = useBandContext();

  const [search, setSearch] = useState<string>("");

  return (
    <Stack
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "500px" }}>
        <TextField
          label="Search for a band, venue, or event"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Stack direction={"row"} spacing={2} width={"100%"} paddingTop={"40px"}>
        <Stack
          direction={"column"}
          width={"30%"}
          spacing={2}
          paddingX={"20px"}
          sx={{
            textAlign: "center",
            display: "flex",
          }}
        >
          <Typography variant="h4">Events</Typography>
          {allFutureEvents
            ?.filter(
              (event) =>
                search.length > 3 &&
                (event.band.bandName
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase()) ||
                  event.venue.venueName
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase()))
            )
            .map((event) => {
              return (
                <Box key={event.id} width={"100%"}>
                  <AdminEventCard
                    event={event}
                    onDelete={() => allFutureEventsQuery.refetch()}
                  />
                </Box>
              );
            })}
        </Stack>
        <Stack
          direction={"column"}
          width={"30%"}
          spacing={2}
          paddingX={"20px"}
          sx={{
            textAlign: "center",
            display: "flex",
          }}
        >
          <Typography variant="h4">Venues</Typography>
          {Object.values(venues)
            .filter(
              (venue) =>
                search.length > 3 &&
                venue.venueName
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
            )
            .map((venue) => {
              return (
                <Box key={venue.id} width={"100%"}>
                  <VenueCard venue={venue} />
                </Box>
              );
            })}
        </Stack>
        <Stack
          direction={"column"}
          width={"30%"}
          spacing={2}
          paddingX={"20px"}
          sx={{
            textAlign: "center",
            display: "flex",
          }}
        >
          <Typography variant="h4">Bands</Typography>
          {Object.values(bands)
            .filter(
              (band) =>
                search.length > 3 &&
                band.bandName
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
            )
            .map((band) => {
              return (
                <Box key={band.id} width={"100%"}>
                  <BandCard band={band} />
                </Box>
              );
            })}
        </Stack>
      </Stack>
    </Stack>
  );
}

function BandCard({ band }: { band: BandDTO }) {
  return (
    <Stack
      direction="column"
      spacing={0.5}
      sx={{
        border: "1px solid #ccc",
        borderRadius: "16px",
        padding: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6">{band.bandName}</Typography>
      <Typography variant="body2">
        Band Type: {BandTypeLabels[band.bandType]}
      </Typography>
      <Typography variant="body2">Tribute: {band.tributeBandName}</Typography>
      <Typography variant="body2">Genres: {band.genres}</Typography>
      <Typography variant="body2">Facebook: {band.facebookUrl}</Typography>
      <Typography variant="body2">Instagram: {band.instagramUrl}</Typography>
      <Typography variant="body2">Website: {band.websiteUrl}</Typography>
      <Button variant="contained" color={"secondary"}>
        Edit Band
      </Button>
    </Stack>
  );
}

function VenueCard({ venue }: { venue: VenueDTO }) {
  return (
    <Stack
      direction="column"
      spacing={0.5}
      sx={{
        border: "1px solid #ccc",
        borderRadius: "16px",
        padding: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6">{venue.venueName}</Typography>
      <Typography variant="body2">Address: {venue.location.address}</Typography>
      <Typography variant="body2">Town: {venue.town}</Typography>
      <Typography variant="body2">County: {venue.county}</Typography>
      <Typography variant="body2">Phone: {venue.phoneNumber}</Typography>
      <Typography variant="body2">Facebook: {venue.facebookUrl}</Typography>
      <Typography variant="body2">Instagram: {venue.instagramUrl}</Typography>
      <Typography variant="body2">Website: {venue.websiteUrl}</Typography>
      <Button variant="contained" color={"secondary"}>
        Edit Venue
      </Button>
    </Stack>
  );
}
