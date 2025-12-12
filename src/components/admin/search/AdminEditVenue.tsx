"use client";

import NewAddressAutocomplete from "@/components/inputs/NewAddressAutocomplete";
import { VenueDTO, VenueDTOSchema } from "@/dto/venue/Venue.dto";
import { useAdminApi } from "@/hooks/useAdminApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Controller, FormProvider, useForm } from "react-hook-form";

interface AdminEventVenueProps {
  venue: VenueDTO;
}

export default function AdminEditVenue({ venue }: AdminEventVenueProps) {
  const formMethods = useForm<VenueDTO>({
    resolver: zodResolver(VenueDTOSchema),
    defaultValues: { ...venue },
  });

  const { editVenue } = useAdminApi();

  const editVenueMutation = useMutation({
    mutationFn: editVenue,
    onSuccess: () => {
      alert("Success");
      window.location.href = `/admin/search/venue/${venue.id}`;
    },
    onError: (error) => {
      alert(`Failed. Error: ${error}`);
    },
  });

  const processEditVenue = formMethods.handleSubmit((data) => {
    editVenueMutation.mutate(data);
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }} paddingTop={"20px"}>
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
          onClick={processEditVenue}
          disabled={editVenueMutation.isPending}
          variant="contained"
        >
          Update Venue
        </Button>
      </Stack>
    </Box>
  );
}
