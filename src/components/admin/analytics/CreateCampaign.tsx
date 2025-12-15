"use client";

import { useAdminApi } from "@/hooks/useAdminApi";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function CreateCampaign() {
  const { getAllCampaigns, createCampaign } = useAdminApi();

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["getAllCampaigns"],
    queryFn: getAllCampaigns,
  });

  const [platform, setPlatform] = useState<string | null>(null);
  const [subgroup, setSubgroup] = useState<string | null>(null);
  const [postMemo, setPostMemo] = useState<string | null>(null);
  const [url, setUrl] = useState<string>("");
  const [finalUrl, setFinalUrl] = useState<string | null>(null);

  const createCampaignMutation = useMutation({
    mutationFn: createCampaign,
    onSuccess: (response) => {
      const curUrl = new URL(url);
      curUrl.search = "";
      curUrl.search = `?c=${response.campaignId}`;
      setFinalUrl(curUrl.toString());
    },
    onError: () => {
      alert("Something went wrong. Please try again");
    },
  });

  const handleCreateUrl = async () => {
    if (!(platform && subgroup && postMemo && url)) {
      alert("Please fill in all fields");
      return;
    }

    createCampaignMutation.mutate({ platform, subgroup, postMemo });
  };

  if (isLoading) {
    return <Box sx={{ paddingTop: "100px" }}>Loading...</Box>;
  }

  if (!campaigns) {
    return (
      <Box sx={{ paddingTop: "100px" }}>Something went wrong. Try again.</Box>
    );
  }

  return (
    <Box sx={{ paddingTop: "25px", width: "100%", paddingX: "50px" }}>
      <Stack
        direction={"column"}
        spacing={10}
        sx={{ width: "100%", display: "flex", alignItems: "center" }}
      >
        <Typography variant="h3">Create a campaign</Typography>
        <Stack direction={"row"} spacing={4} sx={{ width: "100%" }}>
          <Autocomplete
            fullWidth
            freeSolo
            options={Array.from(new Set(campaigns.map((c) => c.platform)))}
            renderInput={(params) => <TextField {...params} label="Platform" />}
            value={platform}
            onInputChange={(_, newValue) => setPlatform(newValue)}
            onChange={(_, newValue) => setPlatform(newValue)}
          />
          <Autocomplete
            disabled={!platform}
            fullWidth
            freeSolo
            options={Array.from(
              new Set(
                campaigns
                  .filter((c) => c.platform === platform)
                  .map((c) => c.subgroup)
              )
            )}
            renderInput={(params) => <TextField {...params} label="Subgroup" />}
            value={subgroup}
            onInputChange={(_, newValue) => setSubgroup(newValue)}
            onChange={(_, newValue) => setSubgroup(newValue)}
          />
          <Autocomplete
            disabled={!subgroup}
            fullWidth
            freeSolo
            options={Array.from(
              new Set(
                campaigns
                  .filter(
                    (c) => c.platform === platform && c.subgroup === subgroup
                  )
                  .map((c) => c.postMemo)
              )
            )}
            renderInput={(params) => (
              <TextField {...params} label="Post Summary" />
            )}
            value={postMemo}
            onInputChange={(_, newValue) => setPostMemo(newValue)}
            onChange={(_, newValue) => setPostMemo(newValue)}
          />
        </Stack>
        <TextField
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          label="URL"
          fullWidth
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleCreateUrl}
          disabled={createCampaignMutation.isPending}
        >
          Create URL
        </Button>
        {finalUrl && <Typography variant="h5">{finalUrl}</Typography>}
      </Stack>
    </Box>
  );
}
