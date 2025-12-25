"use client";

import { useAdminApi } from "@/hooks/useAdminApi";
import {
  Autocomplete,
  Box,
  Checkbox,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import SessionDetails from "./SessionDetails";
import SearchUserDetails from "./SearchUserDetails";

export default function AnalyticsViewDashboard() {
  const { getAllCampaigns } = useAdminApi();

  const { data: campaigns, isLoading: campaignsIsLoading } = useQuery({
    queryKey: ["getAllCampaigns"],
    queryFn: getAllCampaigns,
  });

  const [platform, setPlatform] = useState<string | null>("All");
  const [subgroup, setSubgroup] = useState<string | null>("All");
  const [postMemo, setPostMemo] = useState<string | null>("All");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [includeAdmin, setIncludeAdmin] = useState(false);
  const [minDurationInSec, setMinDurationInSec] = useState<number>(15);

  if (campaignsIsLoading) {
    return (
      <Box sx={{ paddingTop: "100px" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!campaigns) {
    return (
      <Box sx={{ paddingTop: "100px" }}>Something went wrong. Try again.</Box>
    );
  }

  return (
    <Box sx={{ width: "90%", paddingX: "50px" }}>
      <Stack
        direction={"column"}
        spacing={4}
        sx={{ width: "100%", display: "flex", alignItems: "center" }}
      >
        <Stack direction={"row"} spacing={3}>
          <Stack
            direction={"row"}
            spacing={0.5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>Include Admins</Typography>
            <Checkbox
              checked={includeAdmin}
              onChange={() => setIncludeAdmin(!includeAdmin)}
            />
          </Stack>
          <Autocomplete
            fullWidth
            options={[0, 5, 10, 15, 30, 60, 120, 300]}
            renderInput={(params) => (
              <TextField {...params} label="Min Duration (seconds)" />
            )}
            value={minDurationInSec}
            onChange={(_, newValue) => {
              if (newValue || newValue === 0) {
                setMinDurationInSec(newValue);
              }
            }}
          />
        </Stack>
        <Stack direction={"row"} spacing={4} sx={{ width: "100%" }}>
          <Autocomplete
            fullWidth
            options={Array.from(
              new Set(["All", ...campaigns.map((c) => c.platform)])
            )}
            renderInput={(params) => <TextField {...params} label="Platform" />}
            value={platform}
            onChange={(_, newValue) => {
              if (newValue === "All" || newValue === null) {
                setPlatform("All");
                setSubgroup("All");
                setPostMemo("All");
              } else {
                setPlatform(newValue);
              }
            }}
          />
          <Autocomplete
            disabled={!platform}
            fullWidth
            options={Array.from(
              new Set([
                "All",
                ...campaigns
                  .filter((c) => c.platform === platform)
                  .map((c) => c.subgroup),
              ])
            )}
            renderInput={(params) => <TextField {...params} label="Subgroup" />}
            value={subgroup}
            onChange={(_, newValue) => {
              if (newValue === "All" || newValue === null) {
                setSubgroup("All");
                setPostMemo("All");
              } else {
                setSubgroup(newValue);
              }
            }}
          />
          <Autocomplete
            disabled={!subgroup}
            fullWidth
            options={Array.from(
              new Set([
                "All",
                ...campaigns
                  .filter(
                    (c) => c.platform === platform && c.subgroup === subgroup
                  )
                  .map((c) => c.postMemo),
              ])
            )}
            renderInput={(params) => (
              <TextField {...params} label="Post Summary" />
            )}
            value={postMemo}
            onChange={(_, newValue) => {
              if (newValue === "All" || newValue === null) {
                setPostMemo("All");
              } else {
                setPostMemo(newValue);
              }
            }}
          />
          <DayPicker
            mode="range"
            selected={dateRange}
            onSelect={(newDateRange) => {
              setDateRange(newDateRange);
            }}
          />
        </Stack>
        <Stack direction={"column"} spacing={10}>
          <SessionDetails
            platform={platform}
            subgroup={subgroup}
            postMemo={postMemo}
            includeAdmin={includeAdmin}
            dateRange={dateRange}
            minDurationInSec={minDurationInSec}
          />
          <SearchUserDetails
            platform={platform}
            subgroup={subgroup}
            postMemo={postMemo}
            includeAdmin={includeAdmin}
            dateRange={dateRange}
            minDurationInSec={minDurationInSec}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
