"use client";

import { QueryDetailDTO } from "@/dto/analytics/CampaignQueryResponse.dto";
import { useAdminApi } from "@/hooks/useAdminApi";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const SimpleTable = ({
  title,
  rows,
}: {
  title: string;
  rows: QueryDetailDTO[];
}) => (
  <Card variant="outlined" sx={{ mt: 2 }}>
    <CardContent>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Table
        size="small"
        sx={{
          "& th": {
            fontSize: 22,
            fontWeight: 600,
          },
          "& td": {
            fontSize: 21,
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Total Users</TableCell>
            <TableCell align="right">Unique Users</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.totalUsers}</TableCell>
              <TableCell align="right">{row.totalUniqueUsers}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default function AnalyticsViewDashboard() {
  const { getAllCampaigns, queryCampaignUserEvents } = useAdminApi();

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["getAllCampaigns"],
    queryFn: getAllCampaigns,
  });

  const [platform, setPlatform] = useState<string | null>("All");
  const [subgroup, setSubgroup] = useState<string | null>("All");
  const [postMemo, setPostMemo] = useState<string | null>("All");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const { data: analyticsData, isLoading: analyticsDataIsLoading } = useQuery({
    queryKey: [
      "queryCampaignUserEvents",
      platform,
      subgroup,
      postMemo,
      dateRange,
    ],
    queryFn: () => {
      if (
        dateRange &&
        dateRange.to &&
        dateRange.from &&
        platform &&
        subgroup &&
        dateRange
      ) {
        const startDate = formatLocalDate(dateRange.from);
        const endDate = formatLocalDate(dateRange.to);
        const platformToUse = platform === "All" ? null : platform;
        const subgroupToUse = subgroup === "All" ? null : subgroup;
        const postMemoToUse = postMemo === "All" ? null : postMemo;
        return queryCampaignUserEvents({
          platform: platformToUse,
          subgroup: subgroupToUse,
          postMemo: postMemoToUse,
          startDate,
          endDate,
        });
      }

      return { sublayerDetails: [], pathDetails: [] };
    },
  });

  if (isLoading) {
    return <Box sx={{ paddingTop: "100px" }}>Loading...</Box>;
  }

  if (!campaigns) {
    return (
      <Box sx={{ paddingTop: "100px" }}>Something went wrong. Try again.</Box>
    );
  }

  return (
    <Box sx={{ width: "100%", paddingX: "50px" }}>
      <Stack
        direction={"column"}
        spacing={4}
        sx={{ width: "100%", display: "flex", alignItems: "center" }}
      >
        <Stack direction={"row"} spacing={4} sx={{ width: "100%" }}>
          <Autocomplete
            fullWidth
            freeSolo
            options={Array.from(
              new Set(["All", ...campaigns.map((c) => c.platform)])
            )}
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
              new Set([
                "All",
                ...campaigns
                  .filter((c) => c.platform === platform)
                  .map((c) => c.subgroup),
              ])
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
            onInputChange={(_, newValue) => setPostMemo(newValue)}
            onChange={(_, newValue) => setPostMemo(newValue)}
          />
          <DayPicker
            mode="range"
            selected={dateRange}
            onSelect={(newDateRange) => {
              setDateRange(newDateRange);
            }}
          />
        </Stack>
        <Box>
          <SimpleTable
            title="Sublayer Details"
            rows={analyticsData?.sublayerDetails ?? []}
          />
          <SimpleTable
            title="Path Details"
            rows={analyticsData?.pathDetails ?? []}
          />
        </Box>
      </Stack>
    </Box>
  );
}
