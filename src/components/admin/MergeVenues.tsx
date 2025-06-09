"use client";

import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface MergeVenuesProps {
  venues: { name: string; id: number }[];
  adminKey: string;
}

export default function MergeVenues({ venues, adminKey }: MergeVenuesProps) {
  const [venueOne, setVenueOne] = useState<string | null>(null);
  const [venueTwo, setVenueTwo] = useState<string | null>(null);
  const [venueName, setVenueName] = useState<string>("");

  const { mutate } = useMutation({
    mutationFn: () => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/venues/merge?admin_key=${adminKey}`,
        {
          venue_id_one: venueOne?.split(" ::: ")[1],
          venue_id_two: venueTwo?.split(" ::: ")[1],
          venue_name: venueName,
        }
      );
    },
    onSuccess: () => {
      alert("Venues merged successfully!");
      setVenueOne(null);
      setVenueTwo(null);
      setVenueName("");
    },
    onError: (error) => {
      alert("There was an error merging the venues.");
    },
  });

  return (
    <Box sx={{ padding: "50px" }}>
      <Stack direction={"column"} spacing={4}>
        <Stack direction={"row"} spacing={10}>
          <Autocomplete
            fullWidth
            options={venues.map((venue) => venue.name + " ::: " + venue.id)}
            value={venueOne}
            onChange={(_, newValue) => {
              setVenueOne(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Venue One" />
            )}
          />
          <Autocomplete
            fullWidth
            options={venues.map((venue) => venue.name + " ::: " + venue.id)}
            value={venueTwo}
            onChange={(_, newValue) => {
              setVenueTwo(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Venue Two" />
            )}
          />
        </Stack>
        <TextField
          label="Venue Name To Use"
          value={venueName}
          onChange={(event) => {
            setVenueName(event.target.value);
            console.log(event.target.value);
          }}
        />
        <Button
          variant="contained"
          sx={{ maxWidth: "200px" }}
          onClick={() => {
            if (!venueOne || !venueTwo || !venueName) {
              alert("Please fill in all fields.");
              return;
            }
            mutate();
          }}
        >
          Merge
        </Button>
      </Stack>
    </Box>
  );
}
