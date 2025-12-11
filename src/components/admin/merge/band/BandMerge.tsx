"use client";

import MultiselectPicklist from "@/components/inputs/MultiselectPicklist";
import Picklist from "@/components/inputs/Picklist";
import { BandDTO, BandDTOSchema } from "@/dto/band/Band.dto";
import { useAdminApi } from "@/hooks/useAdminApi";
import { useBandsSearch } from "@/hooks/useBandsSearch";
import { BandType, BandTypeLabels } from "@/newTypes/BandType";
import { Genre, GenreLabels } from "@/newTypes/Genre";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function BandMerge() {
  const { bands, searchTerm, setSearchTerm, isBandsLoading } = useBandsSearch();
  const [band1, setBand1] = useState<BandDTO | null>(null);
  const [band2, setBand2] = useState<BandDTO | null>(null);
  const { mergeBands } = useAdminApi();

  const formMethods = useForm<BandDTO>({
    resolver: zodResolver(BandDTOSchema),
    defaultValues: { genres: [] },
  });

  useEffect(() => {
    autofillFields(band1);
  }, [band1]);

  useEffect(() => {
    autofillFields(band2);
  }, [band2]);

  const mergeBandsMutation = useMutation({
    mutationFn: mergeBands,
    mutationKey: ["mergeBands", band1?.id, band2?.id],
    onSuccess: () => {
      alert("Success");
      window.location.href = "/admin/merge/band";
    },
    onError: (error) => {
      alert(`Failed. Reasons: ${error}`);
    },
  });

  const submit = formMethods.handleSubmit((data) => {
    if (!band1 || !band2) {
      alert("You must select two bands to merge");
      return;
    }
    mergeBandsMutation.mutate({ data, band1Id: band1.id, band2Id: band2.id });
  });

  const autofillFields = (band: BandDTO | null) => {
    if (!band) {
      setBand1(null);
      setBand2(null);
      formMethods.reset({ bandType: null as any, genres: [] as any });
      return;
    }

    formMethods.setValue("id", formMethods.watch("id") || band.id);
    formMethods.setValue(
      "bandName",
      formMethods.watch("bandName") || band.bandName
    );
    formMethods.setValue(
      "bandType",
      formMethods.watch("bandType") || band.bandType
    );
    formMethods.setValue(
      "tributeBandName",
      formMethods.watch("tributeBandName") || band.tributeBandName
    );
    formMethods.setValue(
      "genres",
      formMethods.watch("genres").length > 0
        ? formMethods.watch("genres")
        : band.genres
    );
    formMethods.setValue(
      "facebookUrl",
      formMethods.watch("facebookUrl") || band.facebookUrl
    );
    formMethods.setValue(
      "instagramUrl",
      formMethods.watch("instagramUrl") || band.instagramUrl
    );
    formMethods.setValue(
      "websiteUrl",
      formMethods.watch("websiteUrl") || band.websiteUrl
    );
    formMethods.setValue(
      "youtubeVideoIds",
      formMethods.watch("youtubeVideoIds") || band.youtubeVideoIds
    );
  };

  return (
    <Box sx={{ width: "100%", paddingX: "100px" }}>
      <Stack direction={"row"} spacing={10} sx={{ width: "100%" }}>
        <Autocomplete
          fullWidth
          loading={isBandsLoading}
          loadingText="Loading..."
          options={bands}
          filterOptions={(options) => options}
          getOptionKey={(option) => option?.id ?? ""}
          getOptionLabel={(option) => `${option.bandName} :: ${option.id}`}
          noOptionsText={searchTerm ? "No bands found" : "Search for a band"}
          renderInput={(params) => <TextField {...params} label="Band 1" />}
          onInputChange={(_, newSearchTerm) => setSearchTerm(newSearchTerm)}
          value={band1}
          onChange={(_, newBand) => setBand1(newBand)}
        />
        <Autocomplete
          fullWidth
          loading={isBandsLoading}
          loadingText="Loading..."
          options={bands}
          filterOptions={(options) => options}
          getOptionKey={(option) => option?.id ?? ""}
          getOptionLabel={(option) => `${option.bandName} :: ${option.id}`}
          noOptionsText={searchTerm ? "No bands found" : "Search for a band"}
          renderInput={(params) => <TextField {...params} label="Band 2" />}
          onInputChange={(_, newSearchTerm) => setSearchTerm(newSearchTerm)}
          value={band2}
          onChange={(_, newBand) => setBand2(newBand)}
        />
      </Stack>
      <Box
        sx={{ display: "flex", justifyContent: "center" }}
        paddingTop={"100px"}
      >
        <Stack direction={"column"} spacing={"10px"} sx={{ width: "750px" }}>
          <FormProvider {...formMethods}>
            <TextField
              {...formMethods.register("bandName")}
              label="Band Name"
              error={!!formMethods.formState.errors.bandName}
              helperText={formMethods.formState.errors.bandName?.message}
              focused={!!formMethods.watch("bandName")}
            />
            <Picklist
              id="new-band-type"
              label="Band Type"
              error={!!formMethods.formState.errors.bandType}
              rhfName="bandType"
              allValues={Object.values(BandType)}
              valueDisplayNames={BandTypeLabels}
              helperText={formMethods.formState.errors.bandType?.message}
            />
            <TextField
              {...formMethods.register("tributeBandName")}
              label="Tribute Band Name"
              error={!!formMethods.formState.errors.tributeBandName}
              helperText={formMethods.formState.errors.tributeBandName?.message}
              focused={!!formMethods.watch("tributeBandName")}
            />
            <MultiselectPicklist
              label="Genres"
              allValues={Object.values(Genre)}
              valueDisplayNames={GenreLabels}
              error={!!formMethods.formState.errors.genres}
              rhfName="genres"
            />
            <TextField
              {...formMethods.register("facebookUrl")}
              label="Facebook Url"
              error={!!formMethods.formState.errors.facebookUrl}
              helperText={formMethods.formState.errors.facebookUrl?.message}
              focused={!!formMethods.watch("facebookUrl")}
            />
            <TextField
              {...formMethods.register("instagramUrl")}
              label="Instagram Url"
              error={!!formMethods.formState.errors.instagramUrl}
              helperText={formMethods.formState.errors.instagramUrl?.message}
              focused={!!formMethods.watch("instagramUrl")}
            />
            <TextField
              {...formMethods.register("websiteUrl")}
              label="Website Url"
              error={!!formMethods.formState.errors.websiteUrl}
              helperText={formMethods.formState.errors.websiteUrl?.message}
              focused={!!formMethods.watch("websiteUrl")}
            />
          </FormProvider>
          <Button
            onClick={submit}
            disabled={mergeBandsMutation.isPending}
            variant="contained"
          >
            Merge
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
