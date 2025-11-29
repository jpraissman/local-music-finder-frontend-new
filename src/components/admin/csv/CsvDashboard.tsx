"use client";

import { Stack } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import HomeIcon from "@mui/icons-material/Home";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useAdminApi } from "@/hooks/useAdminApi";
import AdminCard from "../AdminCard";

export default function CsvDashboard() {
  const { downloadEventsCsv, downloadBandsCsv, downloadVenuesCsv } =
    useAdminApi();

  return (
    <Stack direction="column" spacing={5} alignItems="center">
      <Stack
        direction="row"
        spacing={10}
        justifyContent="center"
        alignItems="center"
      >
        <AdminCard
          icon={<EventIcon />}
          text="Download Events"
          onClick={() => downloadEventsCsv()}
        />
        <AdminCard
          icon={<HomeIcon />}
          text="Download Bands"
          onClick={() => downloadBandsCsv()}
        />
        <AdminCard
          icon={<MusicNoteIcon />}
          text="Download Venues"
          onClick={() => downloadVenuesCsv()}
        />
      </Stack>
    </Stack>
  );
}
