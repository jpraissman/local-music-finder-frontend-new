"use client";

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CreateEventForm from "./OLDCreateEventForm";
import { blankEvent, blankStructuredFormatting } from "@/types/constants";
import Event from "@/types/Event";
import dayjs from "dayjs";

const EditEvent: React.FC = () => {
  const [event, setEvent] = useState<Event>(blankEvent);
  const [foundEvent, setFoundEvent] = useState<boolean>(false);
  const [eventId, setEventId] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [invalidId, setInvalidId] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);

  const findEvent = async () => {
    setSubmitted(true);

    if (eventId !== "") {
      setFetching(true);
      try {
        const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/events/" + eventId;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          const event: Event = data.event;
          setEvent(event);
          setFoundEvent(true);
        } else {
          setInvalidId(true);
        }
      } catch (err) {
        setInvalidId(true);
      }
      setFetching(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {!foundEvent && (
        <Stack
          sx={{
            // width: { xs: "90%", sm: "80%", md: "60%", lg: "50%", xl: "40%" },
            paddingTop: "50px",
            textAlign: "center",
          }}
          direction="column"
          spacing={1}
          alignItems="center"
        >
          <Typography
            sx={{
              fontSize: { xs: "28px", sm: "32px" },
              paddingBottom: "30px",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Edit/Delete Your Event
          </Typography>
          <TextField
            id="event-id-input"
            label="What is the Event ID?"
            fullWidth
            required
            error={(eventId === "" && submitted) || invalidId}
            variant="outlined"
            value={eventId}
            onChange={(newEventId) => setEventId(newEventId.target.value)}
            helperText={
              invalidId
                ? "This event could not be found. Please make sure the Event ID is correct."
                : eventId === "" && submitted
                ? "This field is required."
                : ""
            }
          />
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "18px" },
              paddingBottom: "30px",
            }}
          >
            Your Event ID can be found in the email you received when you
            created the event.
          </Typography>
          {!fetching && (
            <Button onClick={findEvent} variant="contained">
              Next
            </Button>
          )}
          {fetching && <CircularProgress />}
        </Stack>
      )}
      {foundEvent && (
        <CreateEventForm
          createOrEdit="Edit"
          eventId={eventId}
          event={{
            venueName: event.venue_name,
            bandName: event.band_name,
            bandType: event.band_type,
            tributeBandName: event.tribute_band_name,
            genres: event.genres,
            date: dayjs(event.date_string),
            startTime: dayjs(
              "1900-01-01 " + event.start_time_formatted,
              "YYYY-MM-DD h:mm A"
            ),
            endTime:
              event.end_time === null
                ? null
                : dayjs("1900-01-01 " + event.end_time, "YYYY-MM-DD h:mm A"),
            address: {
              description: event.address,
              structured_formatting: blankStructuredFormatting,
            },
            hasCoverCharge: event.cover_charge === 0 ? "No" : "Yes",
            coverCharge:
              event.cover_charge === 0 ? "" : event.cover_charge.toString(),
            otherInfo: event.other_info,
            facebookHandle: event.facebook_handle,
            instagramHandle: event.instagram_handle,
            venuePhoneNumber: event.phone_number,
            website: event.website,
            bandOrVenue: event.band_or_venue,
            emailAddress: event.email_address,
          }}
        />
      )}
    </Box>
  );
};

export default EditEvent;
