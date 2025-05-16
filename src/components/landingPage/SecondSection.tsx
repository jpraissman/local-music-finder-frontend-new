import { Box, Stack, Typography } from "@mui/material";
import LandingPageCard from "./LandingPageCard";

export default function SectionSection() {
  return (
    <Box sx={{ paddingTop: "40px", paddingBottom: "60px" }}>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "center",
          paddingX: "25px",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          What We Do
        </Typography>
        <Typography variant="h6" color="gray">
          The Local Music Finder makes it easy for music fans to connect with
          local bands and venues.
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ paddingTop: "20px" }}
          spacing={5}
        >
          <LandingPageCard type="POST" />
          <LandingPageCard type="DISCOVER" />
        </Stack>
      </Stack>
    </Box>
  );
}
