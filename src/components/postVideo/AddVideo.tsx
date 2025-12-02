"use client";

import { postVideo } from "@/api/apiCalls";
import { BandDTO } from "@/dto/band/Band.dto";
import { useBandsSearch } from "@/hooks/useBandsSearch";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddVideoProps {
  bandNameToPostFor: string | null;
  bandIdToPostFor: number | null;
}

export default function AddVideo({
  bandNameToPostFor,
  bandIdToPostFor,
}: AddVideoProps) {
  const { searchTerm, setSearchTerm, bands, isBandsLoading } = useBandsSearch();

  const [band, setBand] = useState<Partial<BandDTO> | null>(
    bandNameToPostFor && bandIdToPostFor
      ? {
          bandName: bandNameToPostFor,
          id: Number(bandIdToPostFor),
        }
      : null
  );
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");

  const router = useRouter();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => postVideo(band?.id || null, { youtubeUrl: youtubeUrl }),
    onSuccess: () => {
      router.push(`/post/video/success`);
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "50px",
      }}
    >
      <Stack
        direction="column"
        spacing={4}
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          width: "700px",
        }}
      >
        <Stack direction={"column"} spacing={2}>
          <Typography variant="h4">Post A Video</Typography>
          <Typography variant="body1">
            Use the following form to post a YouTube video for a specific band.
            We currently only support adding YouTube videos.
          </Typography>
        </Stack>
        <Autocomplete
          fullWidth
          loading={isBandsLoading}
          loadingText="Loading..."
          options={bands}
          filterOptions={(options) => options}
          getOptionKey={(option) => option?.id ?? ""}
          getOptionLabel={(option) => option.bandName ?? ""}
          noOptionsText={searchTerm ? "No bands found" : "Search for a band"}
          renderInput={(params) => (
            <TextField {...params} label="Band/Performer" />
          )}
          onInputChange={(_, newSearchTerm) => setSearchTerm(newSearchTerm)}
          value={band}
          onChange={(_, newBand) => setBand(newBand)}
        />
        <TextField
          value={youtubeUrl}
          onChange={(event) => {
            setYoutubeUrl(event.target.value);
          }}
          fullWidth
          label="YouTube Video Link"
        />
        {!isPending && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              if (band?.id && youtubeUrl.length > 0) {
                if (
                  youtubeUrl.indexOf("youtube.com") != -1 ||
                  youtubeUrl.indexOf("youtu.be") != -1
                ) {
                  mutate();
                } else {
                  alert("Please post a valid YouTube link.");
                }
              } else {
                alert("All fields are required.");
              }
            }}
          >
            Add Video
          </Button>
        )}
        {isPending && <CircularProgress />}
        {isError && (
          <Typography variant="body1" color="red">
            There was an error posting the video. Please try again. This video
            may have been posted for this band already or the link is incorrect.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
