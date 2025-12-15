"use client";

import { Stack } from "@mui/material";
import AdminCard from "../AdminCard";
import { Analytics, Create } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function AnalyticsHome() {
  const router = useRouter();

  return (
    <Stack direction="column" spacing={5} alignItems="center">
      <Stack
        direction="row"
        spacing={10}
        justifyContent="center"
        alignItems="center"
      >
        <AdminCard
          icon={<Analytics />}
          text="View"
          onClick={() => router.push("/admin/analytics/view")}
        />
        <AdminCard
          icon={<Create />}
          text="Create Campaign"
          onClick={() => router.push("/admin/analytics/create-campaign")}
        />
      </Stack>
    </Stack>
  );
}
