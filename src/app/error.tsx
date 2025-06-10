"use client";

import { Box, Typography } from "@mui/material";

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
        Unfortunately, there is currently an error with our technical provider.
        We apologize for any inconvenience. Please check back later.
      </Typography>
    </Box>
  );
}
