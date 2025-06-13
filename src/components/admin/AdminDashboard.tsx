"use client";

import {
  Autocomplete,
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
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios, { all } from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import StatCard from "./StatCard";
import Link from "next/link";

interface FetchUserDataProps {
  fromDate: string;
  toDate: string;
  includeAdmins: boolean;
  minDurationSeconds: string;
  adminKey: string;
}

interface AdminData {
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
      start_time: string;
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
}

async function fetchUserData({
  fromDate,
  toDate,
  includeAdmins,
  minDurationSeconds,
  adminKey,
}: FetchUserDataProps) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users?admin_key=${adminKey}&from_date=${fromDate}&to_date=${toDate}&include_admins=${includeAdmins}&min_duration_seconds=${minDurationSeconds}`
  );
  const data: AdminData = res.data;

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
  const [minDurationSeconds, setMinDurationSeconds] = useState("15");

  const { isFetching, data } = useQuery({
    queryKey: [
      "admin",
      formatDate(dateRange.from),
      formatDate(dateRange.to),
      includeAdmins,
      minDurationSeconds,
    ],
    queryFn: () =>
      fetchUserData({
        fromDate: formatDate(dateRange.from),
        toDate: formatDate(dateRange.to),
        adminKey: adminKey,
        includeAdmins: includeAdmins,
        minDurationSeconds: minDurationSeconds,
      }),
  });

  const [allData, setAllData] = useState<AdminData | undefined>(undefined);

  useEffect(() => {
    setAllData(data);
  }, [data]);

  const sortUsers = (
    key:
      | "user_id"
      | "duration"
      | "device"
      | "referer"
      | "videos_clicked"
      | "events_viewed"
      | "type"
      | "pages_visited"
      | "venues_viewed"
      | "bands_viewed"
      | "start_time"
  ) => {
    if (allData) {
      const userDataSorted = Object.entries(allData.users).sort(
        (user1, user2) => {
          if (
            typeof user1[1][key] === "string" &&
            typeof user2[1][key] === "string"
          ) {
            return user1[1][key].localeCompare(user2[1][key]);
          } else if (
            typeof user1[1][key] === "number" &&
            typeof user2[1][key] === "number"
          ) {
            return user1[1][key] - user2[1][key];
          } else {
            return 1;
          }
        }
      );

      setAllData({
        users: Object.fromEntries(userDataSorted),
        totals: allData.totals,
      });
    }
  };

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
            <Box sx={{ paddingTop: "20px", width: "300px" }}>
              <Autocomplete
                fullWidth
                options={["5", "15", "30", "60", "120", "300"]}
                renderInput={(params) => (
                  <TextField {...params} label="Min Duration (in seconds)" />
                )}
                value={minDurationSeconds + " seconds"}
                onChange={(_, newMinDuration: string | null) => {
                  if (newMinDuration) {
                    setMinDurationSeconds(newMinDuration);
                  }
                }}
              />
            </Box>
          </Box>
        </Stack>
        {allData && (
          <Stack direction={"column"} spacing={3}>
            <Stack direction={"row"} spacing={4}>
              <StatCard
                title="Total Unique Users"
                value={allData.totals.total_users}
              />
              <StatCard
                title="New Unique Users"
                value={allData.totals.total_new_users}
              />
              <StatCard
                title="Returning Unique Users"
                value={allData.totals.total_returning_users}
              />
            </Stack>
            <Stack direction={"row"} spacing={4}>
              <StatCard
                title="Total Sessions"
                value={allData.totals.total_sessions}
              />
              <StatCard
                title="New Sessions"
                value={allData.totals.total_new_sessions}
              />
              <StatCard
                title="Returning Sessions"
                value={allData.totals.total_returning_sessions}
              />
            </Stack>
            <Stack direction={"row"} spacing={4}>
              <StatCard
                title="% Mobile"
                value={
                  allData.totals.total_mobile_users / allData.totals.total_users
                }
              />
              <StatCard
                title="% Computer"
                value={
                  allData.totals.total_computer_users /
                  allData.totals.total_users
                }
              />
              <StatCard
                title="% Tablet"
                value={
                  allData.totals.total_tablet_users / allData.totals.total_users
                }
              />
            </Stack>
            <Stack direction={"row"} spacing={4}>
              <StatCard
                title="% Facebook"
                value={
                  allData.totals.total_facebook_referers /
                  allData.totals.total_users
                }
              />
              <StatCard
                title="% Reddit"
                value={
                  allData.totals.total_reddit_referers /
                  allData.totals.total_users
                }
              />
              <StatCard
                title="% Google"
                value={
                  allData.totals.total_google_referers /
                  allData.totals.total_users
                }
              />
              <StatCard
                title="% Patch"
                value={
                  allData.totals.total_patch_referers /
                  allData.totals.total_users
                }
              />
              <StatCard
                title="% Unknown"
                value={
                  allData.totals.total_unknown_referers /
                  allData.totals.total_users
                }
              />
            </Stack>
            <Stack direction={"row"} spacing={4}>
              <StatCard
                title="Avg Duration"
                value={
                  allData.totals.total_duration / allData.totals.total_users
                }
              />
              <StatCard
                title="Avg Pages Visited"
                value={
                  allData.totals.total_pages_visited /
                  allData.totals.total_users
                }
              />
              <StatCard
                title="Avg Events Viewed"
                value={
                  allData.totals.total_events_viewed /
                  allData.totals.total_users
                }
              />
              <StatCard
                title="Total Videos Clicked"
                value={allData.totals.total_videos_clicked}
              />
            </Stack>
            <Stack direction={"row"} spacing={4}>
              <StatCard
                title="Total Venues Viewed"
                value={allData.totals.total_venues_viewed}
              />
              <StatCard
                title="Total Bands Viewed"
                value={allData.totals.total_bands_viewed}
              />
            </Stack>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      onClick={() => sortUsers("user_id")}
                    >
                      User Id
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ cursor: "pointer" }}
                      onClick={() => sortUsers("duration")}
                    >
                      Duration (in minutes)
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ cursor: "pointer" }}
                      onClick={() => sortUsers("start_time")}
                    >
                      Start Time
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ cursor: "pointer" }}
                      onClick={() => sortUsers("device")}
                    >
                      Device
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ cursor: "pointer" }}
                      onClick={() => sortUsers("referer")}
                    >
                      Referer
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ cursor: "pointer" }}
                      onClick={() => sortUsers("type")}
                    >
                      Type
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ cursor: "pointer" }}
                      onClick={() => sortUsers("videos_clicked")}
                    >
                      Videos Clicked
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ cursor: "pointer" }}
                      onClick={() => sortUsers("events_viewed")}
                    >
                      Events Viewed
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ cursor: "pointer" }}
                      onClick={() => sortUsers("pages_visited")}
                    >
                      Pages Visited
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ cursor: "pointer" }}
                      onClick={() => sortUsers("venues_viewed")}
                    >
                      Venues Viewed
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ cursor: "pointer" }}
                      onClick={() => sortUsers("bands_viewed")}
                    >
                      Bands Viewed
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(allData.users).map((user) => (
                    <TableRow
                      key={user[1].user_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link href={`/admin/user/${user[1].user_id}`}>
                          {user[1].user_id}
                        </Link>
                      </TableCell>
                      <TableCell align="right">{`${user[1].duration} min`}</TableCell>
                      <TableCell align="right">
                        {dayjs(user[1].start_time.replace("GMT", "")).format(
                          "MMMM D, YYYY h:mm A"
                        )}
                      </TableCell>
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
