"use client";

import { useEffect, useState } from "react";
import {
  DesktopDatePicker,
  DesktopTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TextField,
  Button,
  Stack,
  Typography,
  InputAdornment,
  Box,
  CircularProgress,
} from "@mui/material";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import Picklist from "@/components/Picklist";
import MultiselectPicklist from "@/components/MultiselectPicklist";
import CurrencyField from "@/components/CurrencyField";
import PlaceType from "@/types/PlaceType";
import {
  CheckCircleOutline,
  Delete,
  Facebook,
  Instagram,
  Language,
  Phone,
  Save,
} from "@mui/icons-material";
import { BAND_TYPES, blankEventDetails, GENRES } from "@/types/constants";
import EventDetails from "@/types/EventDetails";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface CustomInputProps {
  event: EventDetails;
  createOrEdit: string;
  eventId: string;
}

const CreateEventForm: React.FC<CustomInputProps> = ({
  event,
  createOrEdit,
  eventId,
}) => {
  const [eventDetails, setEventDetails] = useState<EventDetails>(event);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [blankError, setBlankError] = useState<boolean>(false);
  const [newEventId, setNewEventId] = useState<string>("");
  const [updatedEvent, setUpdatedEvent] = useState<boolean>(false);
  const [deletedEvent, setDeletedEvent] = useState<boolean>(false);
  const [waiting, setWaiting] = useState<boolean>(false);

  const deleteEvent = async () => {
    setWaiting(true);
    try {
      // await axios.delete(`${baseUrl}/events/` + eventId);
      setEventDetails(blankEventDetails);
      setSubmitted(false);
      setDeletedEvent(true);
    } catch (err) {
      console.error(err);
    }
    setWaiting(false);
  };

  const createOrEditEvent = async () => {
    setWaiting(true);
    setSubmitted(true);

    const venueNameErr = eventDetails.venueName === "";
    const bandNameErr = eventDetails.bandName === "";
    const bandTypeErr = eventDetails.bandType === "";
    const tributeBandNameErr =
      eventDetails.bandType === "Tribute Band" &&
      eventDetails.tributeBandName === "";
    const genreErr = eventDetails.genres.length === 0;
    const dateErr = eventDetails.date === null;
    const startTimeErr = eventDetails.startTime === null;
    const hasCoverChargeErr = eventDetails.hasCoverCharge === "";
    const coverChargeErr =
      eventDetails.hasCoverCharge === "Yes" && eventDetails.coverCharge === "";
    const addressErr = eventDetails.address === null;
    const venueOrBandError = eventDetails.bandOrVenue === "";
    const emailAddressError = eventDetails.emailAddress === "";

    if (
      !(
        venueNameErr ||
        bandNameErr ||
        bandTypeErr ||
        tributeBandNameErr ||
        genreErr ||
        dateErr ||
        startTimeErr ||
        hasCoverChargeErr ||
        coverChargeErr ||
        addressErr ||
        venueOrBandError ||
        emailAddressError
      )
    ) {
      try {
        const body = {
          venue_name: eventDetails.venueName,
          band_name: eventDetails.bandName,
          band_type: eventDetails.bandType,
          tribute_band_name:
            eventDetails.bandType === "Tribute Band"
              ? eventDetails.tributeBandName
              : "",
          genres: eventDetails.genres,
          event_date: eventDetails.date?.format("YYYY-MM-DD"),
          start_time: eventDetails.startTime?.format("HH:mm"),
          end_time:
            eventDetails.endTime === null
              ? null
              : eventDetails.endTime?.format("HH:mm"),
          address: eventDetails.address?.description,
          cover_charge:
            eventDetails.hasCoverCharge === "No"
              ? 0
              : Number(eventDetails.coverCharge),
          other_info: eventDetails.otherInfo,
          facebook_handle: eventDetails.facebookHandle,
          instagram_handle: eventDetails.instagramHandle,
          website: eventDetails.website,
          band_or_venue: eventDetails.bandOrVenue,
          phone_number: eventDetails.venuePhoneNumber,
          address_description: eventDetails.address?.description,
          email_address: eventDetails.emailAddress,
        };
        if (createOrEdit === "Create") {
          const response = await fetch(`${baseUrl}/events`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          if (response.ok) {
            const data = await response.json();
            setNewEventId(data.event.event_id);
          } else {
            console.log("Error:", response.statusText);
          }
        } else {
          const response = await fetch(`${baseUrl}/events/` + eventId, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          if (response.ok) {
            setUpdatedEvent(true);
          } else {
            console.log("Error:", response.statusText);
          }
        }
        setEventDetails(blankEventDetails);
        setSubmitted(false);
      } catch (err) {
        console.error(err);
      }
    } else {
      setBlankError(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setWaiting(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [newEventId, updatedEvent, deletedEvent]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {newEventId !== "" && !updatedEvent && !deletedEvent && (
        <Stack
          sx={{
            width: { xs: "90%", sm: "80%", md: "60%", lg: "50%", xl: "40%" },
            paddingTop: "20px",
            textAlign: "center",
          }}
          direction="column"
          spacing={1}
          alignItems="center"
        >
          <CheckCircleOutline color="success" sx={{ fontSize: "100px" }} />
          <Typography
            sx={{
              fontSize: { xs: "18px", sm: "22px" },
              paddingTop: "20px",
            }}
          >
            Thanks for creating an event with The Local Music Finder!
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "24px", sm: "32px" },
              paddingTop: "40px",
            }}
          >
            Your Event ID:
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "32px", sm: "42px" },
              fontWeight: "bold",
            }}
          >
            {newEventId}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "18px", sm: "22px" },
              paddingTop: "40px",
              paddingBottom: "50px",
            }}
          >
            This Event ID should be used to edit or delete your event. You will
            receive an email containing this Event ID to change any event
            information.
          </Typography>
          <Button
            onClick={() => {
              setNewEventId("");
            }}
            variant="outlined"
            size="large"
          >
            Create Another Event
          </Button>
        </Stack>
      )}
      {newEventId === "" && updatedEvent && !deletedEvent && (
        <Stack
          sx={{
            width: { xs: "90%", sm: "80%", md: "60%", lg: "50%", xl: "40%" },
            paddingTop: "20px",
            textAlign: "center",
          }}
          direction="column"
          spacing={1}
          alignItems="center"
        >
          <CheckCircleOutline color="success" sx={{ fontSize: "100px" }} />
          <Typography
            sx={{
              fontSize: { xs: "24px", sm: "32px" },
              paddingTop: "40px",
              paddingBottom: "50px",
            }}
          >
            Your event has been updated!
          </Typography>
          <Link href="/post">
            <Button variant="outlined" size="large">
              Post Another Event
            </Button>
          </Link>
        </Stack>
      )}
      {newEventId === "" && !updatedEvent && deletedEvent && (
        <Stack
          sx={{
            width: { xs: "90%", sm: "80%", md: "60%", lg: "50%", xl: "40%" },
            paddingTop: "20px",
            textAlign: "center",
          }}
          direction="column"
          spacing={1}
          alignItems="center"
        >
          <CheckCircleOutline color="success" sx={{ fontSize: "100px" }} />
          <Typography
            sx={{
              fontSize: { xs: "24px", sm: "32px" },
              paddingTop: "40px",
              paddingBottom: "50px",
            }}
          >
            Your event has been deleted!
          </Typography>
          <Link href="/post">
            <Button variant="outlined" size="large">
              Post Another Event
            </Button>
          </Link>
        </Stack>
      )}
      {newEventId === "" && !updatedEvent && !deletedEvent && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack
            sx={{
              width: { xs: "90%", sm: "80%", md: "60%", lg: "50%", xl: "40%" },
              paddingTop: "20px",
            }}
            direction="column"
            spacing={5}
            alignItems="center"
          >
            <Typography
              sx={{
                fontSize: { xs: "28px", sm: "32px" },
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              {createOrEdit === "Create"
                ? "Create An Event"
                : "Edit/Delete An Event"}
            </Typography>
            {blankError && (
              <Typography
                color={"red"}
                sx={{
                  fontSize: "16px",
                }}
              >
                Please review the errors below.
              </Typography>
            )}
            <Stack
              direction="column"
              spacing={2}
              sx={{
                width: "100%",
                border: "1px solid black",
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "16px", sm: "20px" },
                }}
              >
                Venue Information
              </Typography>
              <TextField
                id="venue-name"
                label="Venue Name"
                fullWidth
                required
                error={eventDetails.venueName === "" && submitted}
                variant="outlined"
                value={eventDetails.venueName}
                onChange={(newVenueName) =>
                  setEventDetails((prevDetails) => ({
                    ...prevDetails,
                    venueName: newVenueName.target.value,
                  }))
                }
                inputProps={{ maxLength: 50 }}
                helperText={
                  eventDetails.venueName === "" && submitted
                    ? "This field is required."
                    : ""
                }
              />
              <TextField
                id="venue-phone-number"
                label="Venue Phone Number"
                fullWidth
                variant="outlined"
                value={eventDetails.venuePhoneNumber}
                onChange={(newPhoneNum) => {
                  setEventDetails((prevDetails) => ({
                    ...prevDetails,
                    venuePhoneNumber: newPhoneNum.target.value,
                  }));
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack
              direction="column"
              spacing={2}
              sx={{
                width: "100%",
                border: "1px solid black",
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "16px", sm: "20px" },
                }}
              >
                Band/Performer Information
              </Typography>
              <TextField
                id="band-name"
                label="Band/Performer Name"
                fullWidth
                required
                error={eventDetails.bandName === "" && submitted}
                variant="outlined"
                value={eventDetails.bandName}
                onChange={(newBandName) =>
                  setEventDetails((prevDetails) => ({
                    ...prevDetails,
                    bandName: newBandName.target.value,
                  }))
                }
                inputProps={{ maxLength: 50 }}
                helperText={
                  eventDetails.bandName === "" && submitted
                    ? "This field is required."
                    : ""
                }
              />
              <Picklist
                id="band-type"
                label="Band Type"
                error={eventDetails.bandType === "" && submitted}
                value={eventDetails.bandType}
                setValue={(newBandType: string) =>
                  setEventDetails((prevDetails) => ({
                    ...prevDetails,
                    bandType: newBandType,
                  }))
                }
                helperText=""
                allValues={BAND_TYPES}
              />
              {eventDetails.bandType === "Tribute Band" && (
                <TextField
                  id="tribute-band-name"
                  label="Band(s) being covered"
                  fullWidth
                  required
                  error={eventDetails.tributeBandName === "" && submitted}
                  variant="outlined"
                  value={eventDetails.tributeBandName}
                  onChange={(newTributeBandName) => {
                    setEventDetails((prevDetails) => ({
                      ...prevDetails,
                      tributeBandName: newTributeBandName.target.value,
                    }));
                  }}
                  inputProps={{ maxLength: 50 }}
                  helperText={
                    eventDetails.tributeBandName === "" && submitted
                      ? "This field is required."
                      : ""
                  }
                />
              )}
              <MultiselectPicklist
                label="What genre(s) is the band/performer playing?"
                allLabel=""
                allValues={GENRES}
                selectedValues={eventDetails.genres}
                setValues={(newGenres: string[]) =>
                  setEventDetails((prevDetails) => ({
                    ...prevDetails,
                    genres: newGenres,
                  }))
                }
                error={eventDetails.genres.length === 0 && submitted}
              />
            </Stack>
            <Stack
              direction="column"
              spacing={2}
              sx={{
                width: "100%",
                border: "1px solid black",
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "16px", sm: "20px" },
                }}
              >
                Event Information
              </Typography>
              <DesktopDatePicker
                name="date"
                slotProps={{
                  textField: {
                    error: eventDetails.date === null && submitted,
                    helperText:
                      eventDetails.date === null && submitted
                        ? "This field is required."
                        : "",
                    fullWidth: true,
                    required: true,
                  },
                }}
                label="Date of Event"
                value={eventDetails.date}
                onChange={(newDate) =>
                  setEventDetails((prevDetails) => ({
                    ...prevDetails,
                    date: newDate,
                  }))
                }
              />
              <DesktopTimePicker
                name="start-time"
                slotProps={{
                  textField: {
                    error: eventDetails.startTime === null && submitted,
                    helperText:
                      eventDetails.startTime === null && submitted
                        ? "This field is required."
                        : "",
                    fullWidth: true,
                    required: true,
                  },
                }}
                label="Start Time"
                value={eventDetails.startTime}
                onChange={(newStartTime) =>
                  setEventDetails((prevDetails) => ({
                    ...prevDetails,
                    startTime: newStartTime,
                  }))
                }
              />
              <DesktopTimePicker
                name="end-time"
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
                label="End Time (optional)"
                value={eventDetails.endTime}
                onChange={(newEndTime) =>
                  setEventDetails((prevDetails) => ({
                    ...prevDetails,
                    endTime: newEndTime,
                  }))
                }
              />
              <AddressAutocomplete
                id="address"
                label="Address of Event *"
                address={eventDetails.address}
                error={eventDetails.address === null && submitted}
                onAddressChange={(newAddress: PlaceType | null) =>
                  setEventDetails((prevDetails) => ({
                    ...prevDetails,
                    address: newAddress,
                  }))
                }
              />
              <Picklist
                id="has-cover-charge"
                label="Is there a cover charge?"
                error={eventDetails.hasCoverCharge === "" && submitted}
                value={eventDetails.hasCoverCharge}
                setValue={(newHasCoverCharge: string) =>
                  setEventDetails((prevDetails) => ({
                    ...prevDetails,
                    hasCoverCharge: newHasCoverCharge,
                  }))
                }
                helperText=""
                allValues={["Yes", "No"]}
              />
              {eventDetails.hasCoverCharge === "Yes" && (
                <CurrencyField
                  id="cover-charge"
                  label="What is the cover charge?"
                  error={eventDetails.coverCharge === "" && submitted}
                  value={eventDetails.coverCharge}
                  setValue={(newCoverCharge: string) =>
                    setEventDetails((prevDetails) => ({
                      ...prevDetails,
                      coverCharge: newCoverCharge,
                    }))
                  }
                />
              )}
            </Stack>
            <Stack
              direction="column"
              spacing={2}
              sx={{
                width: "100%",
                border: "1px solid black",
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "16px", md: "20px" },
                }}
              >
                Socials
              </Typography>
              <TextField
                id="facebook-handle"
                label="Your Facebook Handle (optional)"
                fullWidth
                variant="outlined"
                value={eventDetails.facebookHandle}
                onChange={(newHandle) => {
                  setEventDetails((prevDetails) => ({
                    ...prevDetails,
                    facebookHandle: newHandle.target.value,
                  }));
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Facebook color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="instagram-handle"
                label="Your Instagram Handle (optional)"
                fullWidth
                variant="outlined"
                value={eventDetails.instagramHandle}
                onChange={(newHandle) => {
                  setEventDetails((prevDetails) => ({
                    ...prevDetails,
                    instagramHandle: newHandle.target.value,
                  }));
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Instagram color="secondary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="website"
                label="Your Website (optional)"
                fullWidth
                variant="outlined"
                value={eventDetails.website}
                onChange={(newWebsite) => {
                  setEventDetails((prevDetails) => ({
                    ...prevDetails,
                    website: newWebsite.target.value,
                  }));
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Language />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack
              direction="column"
              spacing={2}
              sx={{
                width: "100%",
                border: "1px solid black",
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "16px", sm: "20px" },
                }}
              >
                Additional Information
              </Typography>
              {createOrEdit === "Create" && (
                <TextField
                  id="email-address"
                  label="Your Email Address"
                  fullWidth
                  required
                  error={eventDetails.emailAddress === "" && submitted}
                  variant="outlined"
                  value={eventDetails.emailAddress}
                  onChange={(newEmail) => {
                    setEventDetails((prevDetails) => ({
                      ...prevDetails,
                      emailAddress: newEmail.target.value,
                    }));
                  }}
                  inputProps={{ maxLength: 50 }}
                  helperText={
                    eventDetails.tributeBandName === "" && submitted
                      ? "This field is required."
                      : "We will use this to send an event creation confirmation to you."
                  }
                />
              )}
              <Picklist
                id="band-or-venue"
                label="Are you a venue or band/performer?"
                error={eventDetails.bandOrVenue === "" && submitted}
                value={eventDetails.bandOrVenue}
                setValue={(newBandOrVenue: string) =>
                  setEventDetails((prevDetails) => ({
                    ...prevDetails,
                    bandOrVenue: newBandOrVenue,
                  }))
                }
                helperText=""
                allValues={["Venue", "Band/Performer"]}
              />
              <TextField
                fullWidth
                sx={{ textAlign: "left" }}
                id="other-information"
                label="Other Information (optional)"
                rows={4}
                variant="outlined"
                multiline
                helperText="Please provide any additional information"
                value={eventDetails.otherInfo}
                onChange={(newOtherInfo) =>
                  setEventDetails((prevDetails) => ({
                    ...prevDetails,
                    otherInfo: newOtherInfo.target.value,
                  }))
                }
                inputProps={{ maxLength: 150 }}
              />
            </Stack>
            {createOrEdit === "Edit" && (
              <>
                {!waiting && (
                  <Stack direction="row" spacing={4}>
                    <Button
                      onClick={deleteEvent}
                      variant="outlined"
                      startIcon={<Delete />}
                      size="large"
                    >
                      Delete
                    </Button>

                    <Button
                      onClick={createOrEditEvent}
                      variant="contained"
                      endIcon={<Save />}
                      size="large"
                    >
                      Update
                    </Button>
                  </Stack>
                )}
                {waiting && <CircularProgress />}
              </>
            )}
            {createOrEdit === "Create" && (
              <>
                {!waiting && (
                  <Button
                    onClick={createOrEditEvent}
                    variant="contained"
                    size="large"
                  >
                    Create Event
                  </Button>
                )}
                {waiting && <CircularProgress />}
              </>
            )}
          </Stack>
        </LocalizationProvider>
      )}
    </Box>
  );
};

export default CreateEventForm;
