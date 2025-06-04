"use client";

import { Stack, Typography } from "@mui/material";

interface StatCardProps {
  title: string;
  value: string | number;
}

function roundTo(num: number | string, decimals: number) {
  if (typeof num === "string") {
    return num;
  }
  return Math.round(num * 10 ** decimals) / 10 ** decimals;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <Stack
      sx={{
        minWidth: "200px",
        minHeight: "200px",
        backgroundColor: "lightgray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        borderRadius: "10px",
      }}
      direction={"column"}
      spacing={5}
    >
      <Typography variant="h4">{title}</Typography>
      <Typography variant="h3">{roundTo(value, 2)}</Typography>
    </Stack>
  );
}
