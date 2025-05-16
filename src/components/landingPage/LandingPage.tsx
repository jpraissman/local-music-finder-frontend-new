"use client";

import { Stack } from "@mui/material";
import FirstSection from "./FirstSection";
import SectionSection from "./SecondSection";

export default function LandingPage() {
  return (
    <Stack direction="column" spacing={2}>
      <FirstSection />
      <SectionSection />
    </Stack>
  );
}
