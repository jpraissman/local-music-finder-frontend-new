"use client";

import { Stack } from "@mui/material";
import React, { useCallback } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import MergeIcon from "@mui/icons-material/Merge";
import SearchIcon from "@mui/icons-material/Search";
import AdminCard from "./AdminCard";
import { useRouter } from "next/navigation";
import { Analytics } from "@mui/icons-material";

export default function AdminHome() {
  const router = useRouter();

  const handleAdminCardClick = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router]
  );

  return (
    <Stack direction="column" spacing={5} alignItems="center">
      <Stack
        direction="row"
        spacing={10}
        justifyContent="center"
        alignItems="center"
      >
        <AdminCard
          icon={<DownloadIcon />}
          text="CSV Downloads"
          onClick={() => handleAdminCardClick("/admin/csv")}
        />
        <AdminCard
          icon={<MergeIcon />}
          text="Merge"
          onClick={() => handleAdminCardClick("/admin/merge")}
        />
        <AdminCard
          icon={<SearchIcon />}
          text="Search"
          onClick={() => handleAdminCardClick("/admin/search")}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={10}
        justifyContent="center"
        alignItems="center"
      >
        <AdminCard
          icon={<Analytics />}
          text="Analytics"
          onClick={() => handleAdminCardClick("/admin/analytics")}
        />
      </Stack>
    </Stack>
  );
}
