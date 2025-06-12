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

async function fetchSessionData(sessionId: string, adminKey: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/session/${sessionId}?admin_key=${adminKey}`
  );
  const data: {
    activities: {
      [key: string]: {
        id: string;
        page: string;
        user_agent: string;
        ip_address: string;
        referer: string;
        created_at: string;
      };
    };
  } = res.data;

  return data;
}

interface AdminSessionPageProps {
  adminKey: string;
  sessionId: string;
}

export default function AdminSessionPage({
  adminKey,
  sessionId,
}: AdminSessionPageProps) {
  const { isFetching, data } = useQuery({
    queryKey: ["adminSession", sessionId],
    queryFn: () => fetchSessionData(sessionId, adminKey),
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
          Session: {sessionId}
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
                    <TableCell align="center">Page</TableCell>
                    <TableCell align="center">Created At</TableCell>
                    <TableCell align="center">IP Address</TableCell>
                    {showAllData && (
                      <>
                        <TableCell align="center">User Agent</TableCell>
                        <TableCell align="center">Referer</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(data.activities).map((activity) => (
                    <TableRow
                      key={activity[1].id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {activity[1].id}
                      </TableCell>
                      <TableCell align="center">
                        <Link href={`${activity[1].page}`}>
                          {activity[1].page}
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        {dayjs(
                          activity[1].created_at.replace("GMT", "")
                        ).format("MMMM D, YYYY h:mm A")}
                      </TableCell>
                      <TableCell align="center">
                        {activity[1].ip_address}
                      </TableCell>
                      {showAllData && (
                        <>
                          <TableCell align="center">
                            {activity[1].user_agent}
                          </TableCell>
                          <TableCell align="center">
                            {activity[1].referer}
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
