"use client";

import { postVideo } from "@/api/apiCalls";
import { useBandContext } from "@/context/BandContext";
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
  bandToPostFor: string | null;
  bandIdToPostFor: string | null;
}

export default function AddVideo({
  bandToPostFor,
  bandIdToPostFor,
}: AddVideoProps) {
  const [band, setBand] = useState<string | null>(bandToPostFor);
  const [bandId, setBandId] = useState<string | null>(bandIdToPostFor);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");

  const { bands } = useBandContext();

  const router = useRouter();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => postVideo(bandId ?? "", { youtubeUrl: youtubeUrl }),
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
          options={Object.keys(bands)}
          renderInput={(params) => (
            <TextField {...params} label="Band/Performer" />
          )}
          value={band}
          onChange={(_, newBand) => {
            setBand(newBand);
            if (newBand) {
              setBandId(String(bands[newBand].id));
            } else {
              setBandId(null);
            }
          }}
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
              if (bandId && youtubeUrl.length > 0) {
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
