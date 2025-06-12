"use client";

import {
  Box,
  Checkbox,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
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
        venues_viewed: number;
        bands_viewed: number;
      };
    };
    totals: {
      total_users: number;
      total_new_users: number;
      total_returning_users: number;
      total_sessions: number;
      total_new_sessions: number;
      total_returning_sessions: number;
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
      total_venues_viewed: number;
      total_bands_viewed: number;
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
              <StatCard
                title="Total Unique Users"
                value={data.totals.total_users}
              />
              <StatCard
                title="New Unique Users"
                value={data.totals.total_new_users}
              />
              <StatCard
                title="Returning Unique Users"
                value={data.totals.total_returning_users}
              />
            </Stack>
            <Stack direction={"row"} spacing={4}>
              <StatCard
                title="Total Sessions"
                value={data.totals.total_sessions}
              />
              <StatCard
                title="New Sessions"
                value={data.totals.total_new_sessions}
              />
              <StatCard
                title="Returning Sessions"
                value={data.totals.total_returning_sessions}
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
            <Stack direction={"row"} spacing={4}>
              <StatCard
                title="Total Venues Viewed"
                value={data.totals.total_venues_viewed}
              />
              <StatCard
                title="Total Bands Viewed"
                value={data.totals.total_bands_viewed}
              />
            </Stack>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>User Id</TableCell>
                    <TableCell align="right">Duration</TableCell>
                    <TableCell align="right">Device</TableCell>
                    <TableCell align="right">Referer</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Videos Clicked</TableCell>
                    <TableCell align="right">Events Viewed</TableCell>
                    <TableCell align="right">Pages Visited</TableCell>
                    <TableCell align="right">Venues Viewed</TableCell>
                    <TableCell align="right">Bands Viewed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(data.users).map((user) => (
                    <TableRow
                      key={user[1].user_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {user[1].user_id}
                      </TableCell>
                      <TableCell align="right">{user[1].duration}</TableCell>
                      <TableCell align="right">{user[1].device}</TableCell>
                      <TableCell align="right">{user[1].referer}</TableCell>
                      <TableCell align="right">{user[1].type}</TableCell>
                      <TableCell align="right">
                        {user[1].videos_clicked}
                      </TableCell>
                      <TableCell align="right">
                        {user[1].events_viewed}
                      </TableCell>
                      <TableCell align="right">
                        {user[1].pages_visited}
                      </TableCell>
                      <TableCell align="right">
                        {user[1].venues_viewed}
                      </TableCell>
                      <TableCell align="right">
                        {user[1].bands_viewed}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        )}
        {isFetching && <Skeleton sx={{ height: "500px", width: "500px" }} />}
      </Stack>
    </Box>
  );
}
