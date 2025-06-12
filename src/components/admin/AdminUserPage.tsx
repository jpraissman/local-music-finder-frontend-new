"use client";

import {
  Box,
  Button,
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
import Link from "next/link";
import { useState } from "react";

async function fetchUserData(userId: string, adminKey: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userId}?admin_key=${adminKey}`
  );
  const data: {
    sessions: {
      [key: string]: {
        id: string;
        device: string;
        start_time: string;
        end_time: string;
        pages_visited: number;
        videos_clicked: number;
        venues_viewed: number;
        bands_viewed: number;
        user_agent: string;
        referer: string;
      };
    };
  } = res.data;

  return data;
}

interface AdminUserPageProps {
  adminKey: string;
  userId: string;
}

export default function AdminUserPage({
  adminKey,
  userId,
}: AdminUserPageProps) {
  const { isFetching, data } = useQuery({
    queryKey: ["adminUser", userId],
    queryFn: () => fetchUserData(userId, adminKey),
  });

  const [showAllData, setShowAllData] = useState(false);

  return (
    <Box
      sx={{
        padding: "100px",
        display: "flex",
        justifyContent: "center",
        maxWidth: "90vw",
      }}
    >
      <Stack
        direction={"column"}
        spacing={5}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h3" fontWeight={"bold"}>
          User: {userId}
        </Typography>
        <Button
          variant="contained"
          onClick={() => setShowAllData(!showAllData)}
        >
          Toggle Data
        </Button>
        {data && (
          <Stack direction={"column"} spacing={3}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="center">Device</TableCell>
                    <TableCell align="center">Start Time</TableCell>
                    <TableCell align="center">End Time</TableCell>
                    <TableCell align="center">Pages Visited</TableCell>
                    <TableCell align="center">Videos Clicked</TableCell>
                    <TableCell align="center">Venues Viewed</TableCell>
                    <TableCell align="center">Bands Viewed</TableCell>
                    {showAllData && (
                      <>
                        <TableCell align="center">User Agent</TableCell>
                        <TableCell align="center">Referer</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(data.sessions).map((session) => (
                    <TableRow
                      key={session[1].id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link href={`/admin/session/${session[1].id}`}>
                          {session[1].id}
                        </Link>
                      </TableCell>
                      <TableCell align="center">{session[1].device}</TableCell>
                      <TableCell align="center">
                        {dayjs(session[1].start_time.replace("GMT", "")).format(
                          "MMMM D, YYYY h:mm A"
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {dayjs(session[1].end_time.replace("GMT", "")).format(
                          "MMMM D, YYYY h:mm A"
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {session[1].pages_visited}
                      </TableCell>
                      <TableCell align="center">
                        {session[1].videos_clicked}
                      </TableCell>
                      <TableCell align="center">
                        {session[1].venues_viewed}
                      </TableCell>
                      <TableCell align="center">
                        {session[1].bands_viewed}
                      </TableCell>
                      {showAllData && (
                        <>
                          <TableCell align="center">
                            {session[1].user_agent}
                          </TableCell>
                          <TableCell align="center">
                            {session[1].referer}
                          </TableCell>
                        </>
                      )}
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
