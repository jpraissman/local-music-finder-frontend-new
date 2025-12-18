"use client";

import { QueryDetailDTO } from "@/dto/analytics/queryResponse/QueryDetail.dto";
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
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Unique</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
              <TableCell align="right">{row.totalUnique}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default function AnalyticsViewDashboard() {
  const { getAllCampaigns, queryCampaignUserEvents, querySearchUserEvents } =
    useAdminApi();

  const { data: campaigns } = useQuery({
    queryKey: ["getAllCampaigns"],
    queryFn: getAllCampaigns,
  });

  const [platform, setPlatform] = useState<string | null>("All");
  const [subgroup, setSubgroup] = useState<string | null>("All");
  const [postMemo, setPostMemo] = useState<string | null>("All");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const { data: campaignUserData, isLoading: campaignUserDataIsLoading } =
    useQuery({
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

        return {
          totalUsers: -1,
          totalUniqueUsers: -1,
          sublayerDetails: [],
          pathDetails: [],
        };
      },
    });

  const { data: searchUserData, isLoading: searchUserDataIsLoading } = useQuery(
    {
      queryKey: [
        "querySearchUserEvents",
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
          return querySearchUserEvents({
            platform: platformToUse,
            subgroup: subgroupToUse,
            postMemo: postMemoToUse,
            startDate,
            endDate,
          });
        }

        return {
          totalCustomSearches: -1,
          totalUniqueUsersWhoSearched: -1,
          counties: [],
          towns: [],
          formattedAddresses: [],
        };
      },
    }
  );

  if (campaignUserDataIsLoading || searchUserDataIsLoading) {
    return <Box sx={{ paddingTop: "100px" }}>Loading...</Box>;
  }

  if (!campaigns || !searchUserData) {
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
        <Box>
          <Stack direction={"column"} spacing={2}>
            <Typography variant="h4">
              Total User Clicks: {campaignUserData?.totalUsers}
            </Typography>
            <Typography variant="h4">
              Total Unique User Clicks: {campaignUserData?.totalUniqueUsers}
            </Typography>
          </Stack>
          <SimpleTable
            title="Sublayer Details"
            rows={campaignUserData?.sublayerDetails ?? []}
          />
          <SimpleTable
            title="Path Details"
            rows={campaignUserData?.pathDetails ?? []}
          />
        </Box>
        <Box paddingTop={"50px"}>
          <Stack direction={"column"} spacing={2}>
            <Typography variant="h4">
              Total Custom Searchs: {searchUserData?.totalCustomSearches}
            </Typography>
            <Typography variant="h4">
              Total Unique Users Who Searched:{" "}
              {searchUserData?.totalUniqueUsersWhoSearched}
            </Typography>
          </Stack>
          <SimpleTable
            title="County Searches"
            rows={searchUserData?.counties ?? []}
          />
          <SimpleTable
            title="Town Searches"
            rows={searchUserData?.towns ?? []}
          />
          <SimpleTable
            title="Address Searches"
            rows={searchUserData?.formattedAddresses ?? []}
          />
        </Box>
      </Stack>
    </Box>
  );
}
