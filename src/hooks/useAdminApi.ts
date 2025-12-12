"use client";

import { BandDTO, BandDTOSchema } from "@/dto/band/Band.dto";
import { MultiAdminEventsResponseDTOSchema } from "@/dto/event/MultiAdminEventsResponse.dto";
import { VenueDTO, VenueDTOSchema } from "@/dto/venue/Venue.dto";
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

  const mergeBands = useCallback(
    async ({
      data,
      band1Id,
      band2Id,
    }: {
      data: BandDTO;
      band1Id: number;
      band2Id: number;
    }) => {
      const dataValidated = BandDTOSchema.parse(data);
      await axios.post(
        `${BASE_URL}/api/admin/band/merge?band1Id=${band1Id}&band2Id=${band2Id}`,
        dataValidated,
        { headers: { "Admin-Key": adminKey } }
      );
    },
    [adminKey]
  );

  const mergeVenues = useCallback(
    async ({
      data,
      venue1Id,
      venue2Id,
    }: {
      data: VenueDTO;
      venue1Id: number;
      venue2Id: number;
    }) => {
      const dataValidated = VenueDTOSchema.parse(data);
      await axios.post(
        `${BASE_URL}/api/admin/venue/merge?venue1Id=${venue1Id}&venue2Id=${venue2Id}`,
        dataValidated,
        { headers: { "Admin-Key": adminKey } }
      );
    },
    [adminKey]
  );

  const deleteBandVideo = useCallback(
    async ({
      bandId,
      youtubevideoId,
    }: {
      bandId: number;
      youtubevideoId: string;
    }) => {
      console.log("Made it here");
      await axios.delete(
        `${BASE_URL}/api/admin/band/${bandId}/video/${youtubevideoId}`,
        { headers: { "Admin-Key": adminKey } }
      );
    },
    [adminKey]
  );

  const editBand = useCallback(
    async (data: BandDTO) => {
      const dataValidated = BandDTOSchema.parse(data);
      await axios.put(`${BASE_URL}/api/admin/band/edit`, dataValidated, {
        headers: { "Admin-Key": adminKey },
      });
    },
    [adminKey]
  );

  const editVenue = useCallback(
    async (data: VenueDTO) => {
      const dataValidated = VenueDTOSchema.parse(data);
      await axios.put(`${BASE_URL}/api/admin/venue/edit`, dataValidated, {
        headers: { "Admin-Key": adminKey },
      });
    },
    [adminKey]
  );

  return {
    downloadEventsCsv,
    downloadBandsCsv,
    downloadVenuesCsv,
    allFutureEventsQuery,
    mergeBands,
    mergeVenues,
    deleteBandVideo,
    editBand,
    editVenue,
  };
}
