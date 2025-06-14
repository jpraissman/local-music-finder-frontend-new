"use client";

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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const addVideo = async (data: { bandId: string; youTubeUrl: string }) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bands/add-video/${data.bandId}`,
    { video_url: data.youTubeUrl }
  );
  return response.data;
};

interface AddVideoProps {
  bands: {
    [key: string]: {
      id: string;
    };
  };
  bandToPostFor: string | null;
  bandIdToPostFor: string | null;
}

export default function AddVideo({
  bands,
  bandToPostFor,
  bandIdToPostFor,
}: AddVideoProps) {
  const [band, setBand] = useState<string | null>(bandToPostFor);
  const [bandId, setBandId] = useState<string | null>(bandIdToPostFor);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");

  const router = useRouter();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addVideo,
    onSuccess: (data) => {
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
              setBandId(bands[newBand]["id"]);
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
                  mutate({ bandId: bandId, youTubeUrl: youtubeUrl });
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
