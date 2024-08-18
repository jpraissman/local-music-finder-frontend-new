"use client";

import {
  Stack,
  Button,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useState } from "react";
import MultiselectPicklist from "@/components/MultiselectPicklist";
import Picklist from "@/components/Picklist";
import Filters from "@/types/Filters";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import PlaceType from "@/types/PlaceType";
import { Email, Group, House, MusicNote, Place } from "@mui/icons-material";
import { BAND_TYPES, blankFilters, GENRES } from "@/types/constants";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const RegistrationForm: React.FC = () => {
  const [filters, setFilters] = useState<Filters>(blankFilters);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [signedUp, setSignedUp] = useState<boolean>(false);

  const handleGenresChange = (newGenres: string[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      genres: newGenres,
    }));
  };

  const handleBandTypesChange = (newBandTypes: string[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      bandTypes: newBandTypes,
    }));
  };

  const handleAddressChange = (newAddress: PlaceType | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      address: newAddress,
    }));
  };

  const handleMaxDistanceChange = (newMaxDistance: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      maxDistance: newMaxDistance,
    }));
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    if (
      filters.bandTypes.length > 0 &&
      filters.maxDistance !== "" &&
      filters.genres.length > 0 &&
      filters.address !== null &&
      emailAddress !== ""
    ) {
      setFetching(true);
      try {
        const body = {
          email_address: emailAddress,
          address_id: filters.address?.place_id,
          max_distance: filters.maxDistance,
          genres: filters.genres,
          band_types: filters.bandTypes,
          address_description: filters.address?.description,
        };
        const response = await fetch(`${baseUrl}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        if (response.status === 201) {
          setSignedUp(true);
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {!signedUp && (
        <Stack
          direction="column"
          spacing={2.2}
          alignItems="center"
          sx={{ textAlign: "center" }}
        >
          <Typography
            sx={{ fontWeight: "bold", fontSize: { xs: "24px", md: "30px" } }}
          >
            Get Weekly Event Notifications
          </Typography>
          <Typography
            sx={{ paddingBottom: 2, fontSize: { xs: "14px", md: "16px" } }}
          >
            What type of events you would like to get notified about every week?
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <House color="secondary" />
            <AddressAutocomplete
              id="address-filter"
              label="Your Location *"
              address={filters.address}
              error={filters.address === null && submitted}
              onAddressChange={handleAddressChange}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Place color="secondary" />
            <Picklist
              id="max-distance-filter"
              label="Distance you'd travel"
              error={filters.maxDistance === "" && submitted}
              value={filters.maxDistance}
              setValue={handleMaxDistanceChange}
              helperText=""
              allValues={["5 mi", "10 mi", "20 mi", "35 mi", "50 mi", "100 mi"]}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <MusicNote color="action" />
            <MultiselectPicklist
              label="Genre(s)"
              allLabel="All Genres"
              allValues={["All Genres", ...GENRES]}
              selectedValues={filters.genres}
              setValues={handleGenresChange}
              error={filters.genres.length === 0 && submitted}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Group color="action" />
            <MultiselectPicklist
              label="Band Type(s)"
              allLabel="All Types"
              allValues={["All Types", ...BAND_TYPES]}
              selectedValues={filters.bandTypes}
              setValues={handleBandTypesChange}
              error={filters.bandTypes.length === 0 && submitted}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Email color="primary" />
            <TextField
              id="email-address-input"
              label="Your Email Address"
              fullWidth
              required
              error={emailAddress === "" && submitted}
              variant="outlined"
              value={emailAddress}
              onChange={(newEmailAddress) =>
                setEmailAddress(newEmailAddress.target.value)
              }
              inputProps={{ maxLength: 50 }}
              helperText={
                emailAddress === "" && submitted
                  ? "This field is required."
                  : ""
              }
            />
          </Stack>
          <Typography sx={{ fontSize: "14px" }}>
            By signing up, you agree to our terms of service and privacy policy.
          </Typography>
          {!fetching && (
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ fontWeight: "bold", fontSize: "14px" }}
            >
              Sign Up
            </Button>
          )}
          {fetching && <CircularProgress />}
        </Stack>
      )}
      {signedUp && (
        <Stack
          direction="column"
          spacing={2.2}
          alignItems="center"
          sx={{ textAlign: "center" }}
        >
          <Typography
            sx={{ fontWeight: "bold", fontSize: { xs: "24px", md: "30px" } }}
          >
            Thanks for signing up!
          </Typography>
          <Typography
            sx={{ paddingBottom: 2, fontSize: { xs: "15px", md: "18px" } }}
          >
            We will email you events that match your criteria every Wedsenday
            morning.
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default RegistrationForm;
