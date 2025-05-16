"use client";

import { Box, Stack, useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.primary.main }}>
      <Stack direction="row"></Stack>
    </Box>
  );
}
