"use client";

import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import NewAddressAutocomplete from "../inputs/NewAddressAutocomplete";
import MultiselectPicklist from "../inputs/MultiselectPicklist";
import TextFieldWithAutofill from "../inputs/TextFieldWithAutofill";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RHFDatePicker from "../inputs/RHFDatePicker";
import RHFTimePicker from "../inputs/RHFTimePicker";
import Picklist from "../inputs/Picklist";
import { Facebook, Instagram, Language, Phone } from "@mui/icons-material";
import FreeSoloAutocomplete from "../inputs/FreeSoloAutocomplete";
import TermsAgreement from "./TermsAgreement";
import { UpsertEventRequestDTO } from "@/dto/event/UpsertEventRequest.dto";
import { useBandContext } from "@/context/BandContext";
import { useVenueContext } from "@/context/VenueContext";
import {
  BandType,
  BandTypeLabels,
  EventCreatorType,
  EventCreatorTypeLabels,
  Genre,
  GenreLabels,
} from "@/newTypes";

interface EventFormProps {
  creatingEvent: boolean;
}

export default function EventForm({ creatingEvent }: EventFormProps) {
  const { bands } = useBandContext();
  const { venues } = useVenueContext();
  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<UpsertEventRequestDTO>();

  const prefillVenueInfo = (venueName: string | null) => {
    const venueNameTrimmed = venueName?.trim();
    if (venueNameTrimmed && venueNameTrimmed in venues) {
      const existingVenue = venues[venueNameTrimmed];
      setValue("address", existingVenue.address);
      setValue("venuePhone", existingVenue?.phoneNumber || undefined);
      setValue("venueFacebookUrl", existingVenue?.facebookUrl || undefined);
      setValue("venueInstagramUrl", existingVenue?.instagramUrl || undefined);
      setValue("venueWebsiteUrl", existingVenue?.websiteUrl || undefined);
    }
  };

  const prefillBandInfo = (bandName: string | null) => {
    const bandNameTrimmed = bandName?.trim();
    if (bandNameTrimmed && bandNameTrimmed in bands) {
      const existingBand = bands[bandNameTrimmed];
      setValue("genres", existingBand.genres);
      setValue("bandType", existingBand.bandType);
      setValue("tributeBandName", existingBand.tributeBandName || undefined);
      setValue("bandFacebookUrl", existingBand?.facebookUrl || undefined);
      setValue("bandInstagramUrl", existingBand?.instagramUrl || undefined);
      setValue("bandWebsiteUrl", existingBand?.websiteUrl || undefined);
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack
          sx={{
            width: {
              xs: "90%",
              sm: "80%",
              md: "60%",
              lg: "50%",
              xl: "40%",
            },
            paddingTop: "20px",
          }}
          direction="column"
          spacing={5}
          alignItems="center"
        >
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
            <FreeSoloAutocomplete
              id="venue-name-input"
              label="Venue Name"
              error={!!errors.venueName}
              options={Object.keys(venues)}
              rhfName="venueName"
              valueChangeCallback={prefillVenueInfo}
            />
            <TextFieldWithAutofill
              id="phone-number"
              label="Venue Phone Number"
              rhfName="venuePhone"
              error={!!errors.venuePhone}
              helperText={
                errors.venuePhone
                  ? "Please enter a valid phone number"
                  : undefined
              }
              value={watch("venuePhone") || undefined}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Phone />
                    </InputAdornment>
                  ),
                },
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
            <FreeSoloAutocomplete
              id="band-name-input"
              label="Band/Performer Name *"
              error={!!errors.bandName}
              options={Object.keys(bands)}
              valueChangeCallback={prefillBandInfo}
              rhfName="bandName"
            />
            <Picklist
              id="band-type-input"
              label="Band Type"
              error={!!errors.bandType}
              rhfName="bandType"
              allValues={Object.values(BandType)}
              valueDisplayNames={BandTypeLabels}
              valueSetCallback={(newValue) => {
                if (newValue !== "TRIBUTE_BAND") {
                  setValue("tributeBandName", undefined);
                }
              }}
            />
            {watch("bandType") === "TRIBUTE_BAND" && (
              <TextFieldWithAutofill
                id="tribute-band-name-input"
                label="Band(s) being covered"
                error={!!errors.tributeBandName}
                rhfName="tributeBandName"
                value={watch("tributeBandName") || undefined}
                helperText={
                  errors.tributeBandName ? "This field is required." : undefined
                }
              />
            )}
            <MultiselectPicklist
              label="What genre(s) is the band/performer playing?"
              allValues={Object.values(Genre)}
              valueDisplayNames={GenreLabels}
              error={!!errors.genres}
              rhfName="genres"
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
            <RHFDatePicker
              name="event-date-input"
              error={!!errors.eventDate}
              label="Date of Event *"
              rhfName="eventDate"
              control={control}
            />
            <RHFTimePicker
              name="event-start-time-input"
              error={!!errors.startTime}
              label="Start Time *"
              control={control}
              rhfName="startTime"
            />
            <RHFTimePicker
              name="event-start-time-input"
              error={!!errors.endTime}
              label="End Time (optional)"
              control={control}
              rhfName="endTime"
            />
            <Controller
              name="address"
              control={control}
              render={({ field: { onChange, value } }) => (
                <NewAddressAutocomplete
                  id="venue-address-input"
                  label="Address of Event *"
                  value={value ? value : null}
                  setValue={onChange}
                  error={!!errors.address}
                  landingPage={false}
                  disabled={!creatingEvent}
                  helperText={
                    !creatingEvent
                      ? "Note: To change the address please delete the event and create a new one"
                      : undefined
                  }
                />
              )}
            />
            <TextField
              id="cover-charge-input"
              label="Cover Charge (enter 0 if there is none)"
              fullWidth
              variant="outlined"
              {...register("coverCharge", {
                valueAsNumber: true,
              })}
              error={!!errors.coverCharge}
              helperText={
                errors.coverCharge
                  ? "Please enter a valid number. Don't include any extra symbols. Ex: 10"
                  : undefined
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                },
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
                fontSize: { xs: "16px", md: "20px" },
              }}
            >
              Venue Socials
            </Typography>
            <TextFieldWithAutofill
              id="venue-facebook-handle-input"
              label="Link to venue's facebook page (optional)"
              rhfName="venueFacebookUrl"
              value={watch("venueFacebookUrl") || undefined}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Facebook color="primary" />
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors.venueFacebookUrl}
              helperText={
                errors.venueFacebookUrl
                  ? "Please enter a valid facebook url."
                  : "Ex: https://www.facebook.com/PaulMcCartney"
              }
            />
            <TextFieldWithAutofill
              id="venue-instagram-handle-input"
              label="Link to venue's instagram page (optional)"
              rhfName="venueInstagramUrl"
              value={watch("venueInstagramUrl") || undefined}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Instagram color="secondary" />
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors.venueInstagramUrl}
              helperText={
                errors.venueInstagramUrl
                  ? "Please enter a valid instagram url."
                  : "Ex: https://www.instagram.com/paulmccartney/"
              }
            />
            <TextFieldWithAutofill
              id="venue-website-input"
              label="Link to venue's website (optional)"
              rhfName="venueWebsiteUrl"
              value={watch("venueWebsiteUrl") || undefined}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Language />
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors.venueWebsiteUrl}
              helperText={
                errors.venueWebsiteUrl
                  ? "Please enter a valid website."
                  : "Ex: https://www.google.com/"
              }
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
                fontSize: { xs: "16px", md: "20px" },
              }}
            >
              Band/Performer Socials
            </Typography>
            <TextFieldWithAutofill
              id="band-facebook-handle-input"
              label="Link to band's facebook page (optional)"
              rhfName="bandFacebookUrl"
              value={watch("bandFacebookUrl") || undefined}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Facebook color="primary" />
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors.bandFacebookUrl}
              helperText={
                errors.bandFacebookUrl
                  ? "Please enter a valid facebook url."
                  : "Ex: https://www.facebook.com/PaulMcCartney"
              }
            />
            <TextFieldWithAutofill
              id="band-instagram-handle-input"
              label="Link to band's instagram page (optional)"
              rhfName="bandInstagramUrl"
              value={watch("bandInstagramUrl") || undefined}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Instagram color="secondary" />
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors.bandInstagramUrl}
              helperText={
                errors.bandInstagramUrl
                  ? "Please enter a valid instagram url."
                  : "Ex: https://www.instagram.com/paulmccartney/"
              }
            />
            <TextFieldWithAutofill
              id="band-website-input"
              label="Link to band's website (optional)"
              rhfName="bandWebsiteUrl"
              value={watch("bandWebsiteUrl") || undefined}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Language />
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors.bandWebsiteUrl}
              helperText={
                errors.bandWebsiteUrl
                  ? "Please enter a valid website."
                  : "Ex: https://www.google.com/"
              }
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
            <Picklist
              id="venue-or-band-input"
              label="Are you a venue or band/performer? *"
              rhfName="eventCreator"
              allValues={Object.values(EventCreatorType)}
              valueDisplayNames={EventCreatorTypeLabels}
              error={!!errors.eventCreator}
            />
            <TextField
              id="email-address-input"
              label="Your Email Address *"
              disabled={!creatingEvent}
              fullWidth
              error={!!errors.posterEmail}
              variant="outlined"
              {...register("posterEmail")}
              helperText={
                errors.posterEmail
                  ? "Please enter a valid email address."
                  : "We will use this to send an event creation confirmation to you."
              }
            />
            <TextField
              fullWidth
              sx={{ textAlign: "left" }}
              id="other-information-input"
              label="Other Information (optional)"
              rows={4}
              variant="outlined"
              multiline
              helperText="Please provide any additional information"
              {...register("additionalInfo", {
                setValueAs: (v) => (v ? v : undefined),
              })}
              slotProps={{ htmlInput: { maxLength: 250 } }}
            />
          </Stack>
          {creatingEvent && (
            <TermsAgreement
              rhfName="agreesToTermsAndPrivacy"
              control={control}
              error={!!errors.agreesToTermsAndPrivacy}
            />
          )}
        </Stack>
      </LocalizationProvider>
    </Box>
  );
}
