"use client";

import NewAddressAutocomplete from "@/components/inputs/NewAddressAutocomplete";
import { VenueDTO, VenueDTOSchema } from "@/dto/venue/Venue.dto";
import { useAdminApi } from "@/hooks/useAdminApi";
import { useVenuesSearch } from "@/hooks/useVenuesSearch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

export default function VenueMerge() {
  const { venues, searchTerm, setSearchTerm, isVenuesLoading } =
    useVenuesSearch();
  const [venue1, setVenue1] = useState<VenueDTO | null>(null);
  const [venue2, setVenue2] = useState<VenueDTO | null>(null);
  const { mergeVenues } = useAdminApi();

  const formMethods = useForm<VenueDTO>({
    resolver: zodResolver(VenueDTOSchema),
  });

  const mergeVenuesMutation = useMutation({
    mutationFn: mergeVenues,
    mutationKey: ["mergeVenues", venue1?.id, venue2?.id],
    onSuccess: () => {
      alert("Success");
      window.location.href = "/admin/merge/venue";
    },
    onError: (error) => {
      alert(`Failed. Reasons: ${error}`);
    },
  });

  const submit = formMethods.handleSubmit((data) => {
    if (!venue1 || !venue2) {
      alert("You must select two venues to merge");
      return;
    }
    if (venue1.id === venue2.id) {
      alert("You must select different venues");
      return;
    }
    mergeVenuesMutation.mutate({
      data,
      venue1Id: venue1.id,
      venue2Id: venue2.id,
    });
  });

  const autofillFields = (venue: VenueDTO | null) => {
    if (!venue) {
      setVenue1(null);
      setVenue2(null);
      formMethods.reset({ location: {} });
      return;
    }

    formMethods.setValue("id", formMethods.watch("id") || venue.id);
    formMethods.setValue(
      "venueName",
      formMethods.watch("venueName") || venue.venueName
    );
    formMethods.setValue(
      "location",
      formMethods.watch("location.locationId")
        ? formMethods.watch("location")
        : venue.location
    );
    formMethods.setValue("town", formMethods.watch("town") || venue.town);
    formMethods.setValue("county", formMethods.watch("county") || venue.county);
    formMethods.setValue(
      "phoneNumber",
      formMethods.watch("phoneNumber") || venue.phoneNumber
    );
    formMethods.setValue(
      "facebookUrl",
      formMethods.watch("facebookUrl") || venue.facebookUrl
    );
    formMethods.setValue(
      "instagramUrl",
      formMethods.watch("instagramUrl") || venue.instagramUrl
    );
    formMethods.setValue(
      "websiteUrl",
      formMethods.watch("websiteUrl") || venue.websiteUrl
    );
  };

  useEffect(() => {
    autofillFields(venue1);
  }, [venue1, autofillFields]);

  useEffect(() => {
    autofillFields(venue2);
  }, [venue2, autofillFields]);

  return (
    <Box sx={{ width: "100%", paddingX: "100px" }}>
      <Stack direction={"row"} spacing={10} sx={{ width: "100%" }}>
        <Autocomplete
          fullWidth
          loading={isVenuesLoading}
          loadingText="Loading..."
          options={venues}
          filterOptions={(options) => options}
          getOptionKey={(option) => option?.id ?? ""}
          getOptionLabel={(option) => `${option.venueName} :: ${option.id}`}
          noOptionsText={searchTerm ? "No venues found" : "Search for a venue"}
          renderInput={(params) => <TextField {...params} label="Venue 1" />}
          onInputChange={(_, newSearchTerm) => setSearchTerm(newSearchTerm)}
          value={venue1}
          onChange={(_, newVenue) => setVenue1(newVenue)}
        />
        <Autocomplete
          fullWidth
          loading={isVenuesLoading}
          loadingText="Loading..."
          options={venues}
          filterOptions={(options) => options}
          getOptionKey={(option) => option?.id ?? ""}
          getOptionLabel={(option) => `${option.venueName} :: ${option.id}`}
          noOptionsText={searchTerm ? "No venues found" : "Search for a venue"}
          renderInput={(params) => <TextField {...params} label="Venue 2" />}
          onInputChange={(_, newSearchTerm) => setSearchTerm(newSearchTerm)}
          value={venue2}
          onChange={(_, newVenue) => setVenue2(newVenue)}
        />
      </Stack>
      <Box
        sx={{ display: "flex", justifyContent: "center" }}
        paddingTop={"100px"}
      >
        <Stack direction={"column"} spacing={"10px"} sx={{ width: "750px" }}>
          <FormProvider {...formMethods}>
            <TextField
              {...formMethods.register("venueName", {
                setValueAs: (v) => (v ? v : undefined),
              })}
              label="Venue Name"
              error={!!formMethods.formState.errors.venueName}
              helperText={formMethods.formState.errors.venueName?.message}
              focused={!!formMethods.watch("venueName")}
            />
            <Controller
              name="location"
              control={formMethods.control}
              render={({ field: { onChange, value } }) => (
                <NewAddressAutocomplete
                  id="venue-address-input"
                  label="Venue Location"
                  value={value ? value : { locationId: "", address: "" }}
                  setValue={onChange}
                  error={!!formMethods.formState.errors.location}
                  landingPage={false}
                  helperText={formMethods.formState.errors.location?.message}
                />
              )}
            />
            <TextField
              {...formMethods.register("phoneNumber", {
                setValueAs: (v) => (v ? v : undefined),
              })}
              label="Phone Number"
              error={!!formMethods.formState.errors.phoneNumber}
              helperText={formMethods.formState.errors.phoneNumber?.message}
              focused={!!formMethods.watch("phoneNumber")}
            />
            <TextField
              {...formMethods.register("facebookUrl", {
                setValueAs: (v) => (v ? v : undefined),
              })}
              label="Facebook Url"
              error={!!formMethods.formState.errors.facebookUrl}
              helperText={formMethods.formState.errors.facebookUrl?.message}
              focused={!!formMethods.watch("facebookUrl")}
            />
            <TextField
              {...formMethods.register("instagramUrl", {
                setValueAs: (v) => (v ? v : undefined),
              })}
              label="Instagram Url"
              error={!!formMethods.formState.errors.instagramUrl}
              helperText={formMethods.formState.errors.instagramUrl?.message}
              focused={!!formMethods.watch("instagramUrl")}
            />
            <TextField
              {...formMethods.register("websiteUrl", {
                setValueAs: (v) => (v ? v : undefined),
              })}
              label="Website Url"
              error={!!formMethods.formState.errors.websiteUrl}
              helperText={formMethods.formState.errors.websiteUrl?.message}
              focused={!!formMethods.watch("websiteUrl")}
            />
          </FormProvider>
          <Button
            onClick={submit}
            disabled={mergeVenuesMutation.isPending}
            variant="contained"
          >
            Merge
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
