"use client";

import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { PlaceType } from "@/types/PlaceType";
import {
  BAND_TYPES,
  blankStructuredFormatting,
  GENRES,
} from "@/types/constants";
import NewAddressAutocomplete from "../inputs/NewAddressAutocomplete";
import MultiselectPicklist from "../inputs/MultiselectPicklist";
import TextFieldWithAutofill from "../inputs/TextFieldWithAutofill";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RHFDatePicker from "../inputs/RHFDatePicker";
import RHFTimePicker from "../inputs/RHFTimePicker";
import PhoneNumber from "../inputs/PhoneNumber";
import Picklist from "../inputs/Picklist";
import CurrencyField from "../inputs/CurrencyField";
import { Facebook, Instagram, Language } from "@mui/icons-material";
import { EventFormFields } from "@/types/schemas/eventFormSchema";
import FreeSoloAutocomplete from "../inputs/FreeSoloAutocomplete";
import TermsAgreement from "./TermsAgreement";
import { useSuspenseQuery } from "@tanstack/react-query";
import { loadVenues } from "@/lib/load-venues";
import { loadBands } from "@/lib/load-bands";

interface EventFormProps {
  creatingEvent: boolean;
  register: UseFormRegister<EventFormFields>;
  control: Control<EventFormFields>;
  formState: FormState<EventFormFields>;
  setValue: UseFormSetValue<EventFormFields>;
  watch: UseFormWatch<EventFormFields>;
}

export default function EventForm({
  creatingEvent,
  register,
  control,
  formState: { errors },
  setValue,
  watch,
}: EventFormProps) {
  const { data: venues } = useSuspenseQuery({
    queryKey: ["venues"],
    queryFn: loadVenues,
  });
  const { data: bands } = useSuspenseQuery({
    queryKey: ["bands"],
    queryFn: loadBands,
  });

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
              control={control}
              rhfName="venueName"
              handleSelect={(newVenueName: string | null) => {
                if (newVenueName !== null && newVenueName in venues) {
                  const relatedPlaceType: PlaceType = {
                    description: venues[newVenueName]["address"],
                    place_id: venues[newVenueName]["place_id"],
                    structured_formatting: blankStructuredFormatting,
                  };
                  setValue("venueAddress", relatedPlaceType);
                }
              }}
            />
            <PhoneNumber
              id="phone-number-input"
              label="Venue Phone Number"
              error={!!errors.phone}
              control={control}
              rhfName="phone"
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
              handleSelect={(newBandName: string | null) => {
                if (newBandName !== null && newBandName in bands) {
                  setValue("genres", bands[newBandName]["genres"]);
                  setValue("bandType", bands[newBandName]["band_type"]);
                  setValue(
                    "tributeBandName",
                    bands[newBandName]["tribute_band_name"]
                  );
                }
              }}
              control={control}
              rhfName="bandName"
            />
            <Picklist
              id="band-type-input"
              label="Band Type"
              error={!!errors.bandType}
              control={control}
              rhfName="bandType"
              allValues={BAND_TYPES}
            />
            {watch("bandType") === "Tribute Band" && (
              <TextFieldWithAutofill
                id="tribute-band-name-input"
                label="Band(s) being covered"
                error={!!errors.tributeBandName}
                register={register}
                rhfName="tributeBandName"
                value={watch("tributeBandName")}
              />
            )}
            <MultiselectPicklist
              label="What genre(s) is the band/performer playing?"
              allLabel=""
              allValues={GENRES}
              error={!!errors.genres}
              control={control}
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
              error={!!errors.eventStartTime}
              label="Start Time *"
              control={control}
              rhfName="eventStartTime"
            />
            <RHFTimePicker
              name="event-start-time-input"
              error={!!errors.eventEndTime}
              label="End Time (optional)"
              control={control}
              rhfName="eventEndTime"
            />
            <Controller
              name="venueAddress"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <NewAddressAutocomplete
                  id="venue-address-input"
                  label="Address of Event *"
                  value={value ? value : null}
                  setValue={onChange}
                  error={!!errors.venueAddress}
                  landingPage={false}
                />
              )}
            />
            <Picklist
              id="has-cover-charge-input"
              label="Is there a cover charge?"
              error={!!errors.hasCoverCharge}
              control={control}
              rhfName="hasCoverCharge"
              allValues={["Yes", "No"]}
            />
            {watch("hasCoverCharge") === "Yes" && (
              <CurrencyField
                id="cover-charge-input"
                label="What is the cover charge?"
                error={!!errors.coverCharge}
                control={control}
                rhfName="coverCharge"
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
              id="facebook-handle-input"
              label="Link to your facebook page (optional)"
              fullWidth
              variant="outlined"
              {...register("facebookHandle")}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Facebook color="primary" />
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors.facebookHandle}
              helperText={
                errors.facebookHandle
                  ? "Please enter a valid facebook url."
                  : "Ex: https://www.facebook.com/PaulMcCartney"
              }
            />
            <TextField
              id="instagram-handle-input"
              label="Link to your instagram page (optional)"
              fullWidth
              variant="outlined"
              {...register("instagramHandle")}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Instagram color="secondary" />
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors.instagramHandle}
              helperText={
                errors.instagramHandle
                  ? "Please enter a valid instagram url."
                  : "Ex: https://www.instagram.com/paulmccartney/"
              }
            />
            <TextField
              id="website-input"
              label="Link to your website (optional)"
              fullWidth
              variant="outlined"
              {...register("website")}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Language />
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors.website}
              helperText={
                errors.website
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
            <TextField
              id="email-address-input"
              label="Your Email Address *"
              slotProps={{ input: { readOnly: !creatingEvent } }}
              fullWidth
              error={!!errors.email}
              variant="outlined"
              {...register("email")}
              helperText={
                errors.email
                  ? "Please enter a valid email address."
                  : "We will use this to send an event creation confirmation to you."
              }
            />
            <Picklist
              id="venue-or-band-input"
              label="Are you a venue or band/performer? *"
              control={control}
              rhfName="bandOrVenue"
              allValues={["Venue", "Band/Performer"]}
              error={!!errors.bandOrVenue}
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
              {...register("otherInfo")}
              slotProps={{ htmlInput: { maxLength: 250 } }}
            />
          </Stack>
          {creatingEvent && (
            <TermsAgreement
              rhfName="agreeToTerms"
              control={control}
              error={!!errors.agreeToTerms}
            />
          )}
        </Stack>
      </LocalizationProvider>
    </Box>
  );
}
