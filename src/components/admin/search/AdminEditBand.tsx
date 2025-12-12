"use client";

import MultiselectPicklist from "@/components/inputs/MultiselectPicklist";
import Picklist from "@/components/inputs/Picklist";
import { BandDTO, BandDTOSchema } from "@/dto/band/Band.dto";
import { useAdminApi } from "@/hooks/useAdminApi";
import { BandType, BandTypeLabels } from "@/newTypes/BandType";
import { Genre, GenreLabels } from "@/newTypes/Genre";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";

interface AdminEventBandProps {
  band: BandDTO;
}

export default function AdminEditBand({ band }: AdminEventBandProps) {
  const formMethods = useForm<BandDTO>({
    resolver: zodResolver(BandDTOSchema),
    defaultValues: { ...band },
  });

  const { editBand, deleteBandVideo } = useAdminApi();

  const editBandMutation = useMutation({
    mutationFn: editBand,
    onSuccess: () => {
      alert("Success");
      window.location.href = `/admin/search/band/${band.id}`;
    },
    onError: (error) => {
      alert(`Failed. Error: ${error}`);
    },
  });

  const deleteBandVideoMutation = useMutation({
    mutationFn: deleteBandVideo,
    onSuccess: () => {
      alert("Video Deleted!");
      window.location.href = `/admin/search/band/${band.id}`;
    },
    onError: (error) => {
      alert(`Video failed to delete. Error: ${error}`);
    },
  });

  const processEditBand = formMethods.handleSubmit((data) => {
    editBandMutation.mutate(data);
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }} paddingTop={"20px"}>
      <Stack direction={"column"} spacing={"10px"} sx={{ width: "750px" }}>
        <FormProvider {...formMethods}>
          <TextField
            {...formMethods.register("bandName", {
              setValueAs: (v) => (v ? v : undefined),
            })}
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
            {...formMethods.register("tributeBandName", {
              setValueAs: (v) => (v ? v : undefined),
            })}
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
          onClick={processEditBand}
          disabled={editBandMutation.isPending}
          variant="contained"
        >
          Update Band
        </Button>
        <Box sx={{ paddingTop: "50px" }}>
          {band.youtubeVideoIds.length > 0 && (
            <Grid container spacing={2} rowSpacing={5} columnSpacing={10}>
              {band.youtubeVideoIds.map((videoId) => (
                <Grid
                  size={{ xs: 12, lg: 6 }}
                  key={videoId}
                  sx={{
                    display: "flex",
                    justifyContent: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0,
                    }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="YouTube Video"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      deleteBandVideoMutation.mutate({
                        bandId: band.id,
                        youtubevideoId: videoId,
                      });
                    }}
                    disabled={deleteBandVideoMutation.isPending}
                  >
                    Delete Video
                  </Button>
                </Grid>
              ))}
            </Grid>
          )}
          {band.youtubeVideoIds.length == 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "30px",
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontSize: { xs: "20px", md: "30px" } }}>
                {"Band has no videos"}
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
