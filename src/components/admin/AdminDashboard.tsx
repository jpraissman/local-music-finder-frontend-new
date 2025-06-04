"use client";

import { Box, Checkbox, Skeleton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import StatCard from "./StatCard";

interface FetchUserDataProps {
  fromDate: string;
  toDate: string;
  includeAdmins: boolean;
  filterOutZeroSecondDurations: boolean;
  adminKey: string;
}

async function fetchUserData({
  fromDate,
  toDate,
  includeAdmins,
  filterOutZeroSecondDurations,
  adminKey,
}: FetchUserDataProps) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users?admin_key=${adminKey}&from_date=${fromDate}&to_date=${toDate}&include_admins=${includeAdmins}&filter_out_zero_duration=${filterOutZeroSecondDurations}`
  );
  const data: {
    users: {
      [key: string]: {
        user_id: string;
        duration: number;
        device: string;
        referer: string;
        videos_clicked: number;
        events_viewed: number;
        type: number;
        pages_visited: number;
      };
    };
    totals: {
      total_users: number;
      total_new_users: number;
      total_returning_users: number;
      total_mobile_users: number;
      total_tablet_users: number;
      total_computer_users: number;
      total_facebook_referers: number;
      total_reddit_referers: number;
      total_google_referers: number;
      total_patch_referers: number;
      total_unknown_referers: number;
      total_videos_clicked: number;
      total_events_viewed: number;
      total_pages_visited: number;
      total_duration: number;
    };
  } = res.data;

  return data;
}

function formatDate(date: Date | undefined) {
  return dayjs(date).format("YYYY-MM-DD");
}

function getDateRangeToday() {
  const dateRange = {
    from: new Date(),
    to: new Date(),
  };
  return dateRange;
}

interface AdminDashboardProps {
  adminKey: string;
}

export default function AdminDashboard({ adminKey }: AdminDashboardProps) {
  const [dateRange, setDateRange] = useState<DateRange>(getDateRangeToday());
  const [includeAdmins, setIncludeAdmins] = useState(false);
  const [filterZeroSecondDurations, setFilterZeroSecondDurations] =
    useState(true);

  const { isFetching, data, isError } = useQuery({
    queryKey: [
      "admin",
      formatDate(dateRange.from),
      formatDate(dateRange.to),
      includeAdmins,
      filterZeroSecondDurations,
    ],
    queryFn: () =>
      fetchUserData({
        fromDate: formatDate(dateRange.from),
        toDate: formatDate(dateRange.to),
        adminKey: adminKey,
        includeAdmins: includeAdmins,
        filterOutZeroSecondDurations: filterZeroSecondDurations,
      }),
  });

  return (
    <Box sx={{ paddingTop: "50px", display: "flex", justifyContent: "center" }}>
      <Stack direction={"column"} spacing={5}>
        <Stack direction="row" spacing={10}>
          <DayPicker
            mode="range"
            onSelect={(newDateRange) => {
              if (newDateRange) {
                setDateRange(newDateRange);
              }
            }}
            selected={dateRange}
          />
          <Box>
            <Stack
              direction={"row"}
              spacing={0.5}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography>Include Admins?</Typography>
              <Checkbox
                checked={includeAdmins}
                onChange={() => setIncludeAdmins(!includeAdmins)}
              />
            </Stack>
            <Stack
              direction={"row"}
              spacing={0.5}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography>Filter Out Zero Second Durations?</Typography>
              <Checkbox
                checked={filterZeroSecondDurations}
                onChange={() =>
                  setFilterZeroSecondDurations(!filterZeroSecondDurations)
                }
              />
            </Stack>
          </Box>
        </Stack>
        {data && (
          <Stack direction={"column"} spacing={3}>
            <Stack direction={"row"} spacing={4}>
              <StatCard title="Total Users" value={data.totals.total_users} />
              <StatCard title="New Users" value={data.totals.total_new_users} />
              <StatCard
                title="Returning Users"
                value={data.totals.total_returning_users}
              />
            </Stack>
            <Stack direction={"row"} spacing={4}>
              <StatCard
                title="% Mobile"
                value={data.totals.total_mobile_users / data.totals.total_users}
              />
              <StatCard
                title="% Computer"
                value={
                  data.totals.total_computer_users / data.totals.total_users
                }
              />
              <StatCard
                title="% Tablet"
                value={data.totals.total_tablet_users / data.totals.total_users}
              />
            </Stack>
            <Stack direction={"row"} spacing={4}>
              <StatCard
                title="% Facebook"
                value={
                  data.totals.total_facebook_referers / data.totals.total_users
                }
              />
              <StatCard
                title="% Reddit"
                value={
                  data.totals.total_reddit_referers / data.totals.total_users
                }
              />
              <StatCard
                title="% Google"
                value={
                  data.totals.total_google_referers / data.totals.total_users
                }
              />
              <StatCard
                title="% Patch"
                value={
                  data.totals.total_patch_referers / data.totals.total_users
                }
              />
              <StatCard
                title="% Unknown"
                value={
                  data.totals.total_unknown_referers / data.totals.total_users
                }
              />
            </Stack>
            <Stack direction={"row"} spacing={4}>
              <StatCard
                title="Avg Duration"
                value={data.totals.total_duration / data.totals.total_users}
              />
              <StatCard
                title="Avg Pages Visited"
                value={
                  data.totals.total_pages_visited / data.totals.total_users
                }
              />
              <StatCard
                title="Avg Events Viewed"
                value={
                  data.totals.total_events_viewed / data.totals.total_users
                }
              />
              <StatCard
                title="Total Videos Clicked"
                value={data.totals.total_videos_clicked}
              />
            </Stack>
          </Stack>
        )}
        {isFetching && <Skeleton sx={{ height: "500px", width: "500px" }} />}
      </Stack>
    </Box>
  );
}
