"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "100px",
      }}
    >
      <Typography variant="h6" color="red">
        Something went wrong. <Link href={"/"}>Back to Home</Link>
      </Typography>
    </Box>
  );
}
