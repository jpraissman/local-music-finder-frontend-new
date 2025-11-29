"use client";

import { MultiAdminEventsResponseDTOSchema } from "@/dto/event/MultiAdminEventsResponse.dto";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useMemo } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL || "";

export function useAdminApi() {
  const adminKey = Cookies.get("adminKey") ?? null;

  const downloadCsv = useCallback(
    async (url: string, fileName: string) => {
      const { data }: { data: Blob } = await axios.get(url, {
        headers: { "Admin-Key": adminKey },
        responseType: "blob",
      });

      const objectUrl = window.URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(objectUrl);
    },
    [adminKey]
  );

  const downloadEventsCsv = useCallback(async () => {
    await downloadCsv(`${BASE_URL}/api/admin/event/csv`, "events.csv");
  }, [downloadCsv]);

  const downloadBandsCsv = useCallback(async () => {
    await downloadCsv(`${BASE_URL}/api/admin/band/csv`, "bands.csv");
  }, [downloadCsv]);

  const downloadVenuesCsv = useCallback(async () => {
    await downloadCsv(`${BASE_URL}/api/admin/venue/csv`, "venues.csv");
  }, [downloadCsv]);

  const allFutureEventsQuery = useQuery({
    queryKey: ["allFutureEvents", adminKey],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE_URL}/api/admin/event/all-future`,
        {
          headers: { "Admin-Key": adminKey },
        }
      );
      return MultiAdminEventsResponseDTOSchema.parse(data);
    },
  });

  return {
    downloadEventsCsv,
    downloadBandsCsv,
    downloadVenuesCsv,
    allFutureEventsQuery,
  };
}
