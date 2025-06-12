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
}

export default function AddVideo({ bands }: AddVideoProps) {
  const [band, setBand] = useState<string | null>(null);
  const [bandId, setBandId] = useState<string | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");

  const router = useRouter();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: addVideo,
    onSuccess: (data) => {
      router.push(`/video/success`);
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
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
        <Typography variant="h4">Add A Video</Typography>
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
            console.log(event.target.value);
          }}
          fullWidth
          label="YouTube Link"
        />
        {!isPending && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              if (bandId && youtubeUrl.length > 0) {
                mutate({ bandId: bandId, youTubeUrl: youtubeUrl });
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
            There was an error. Try again.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
