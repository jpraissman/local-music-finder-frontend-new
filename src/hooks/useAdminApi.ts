"use client";

import { SessionQueryResponseDTOSchema } from "@/dto/analytics/queryResponse/SessionQueryResponse.dto";
import { AnalyticsQueryDTO } from "@/dto/analytics/AnalyticsQuery.dto";
import { CreateCampaignDTO } from "@/dto/analytics/CreateCampaign.dto";
import { CreateCampaignResponseDTOSchema } from "@/dto/analytics/CreateCampaignResponse.dto";
import { GetAllCampaignsDTOSchema } from "@/dto/analytics/GetAllCampaignsResponse.dto";
import { BandDTO, BandDTOSchema } from "@/dto/band/Band.dto";
import { MultiAdminEventsResponseDTOSchema } from "@/dto/event/MultiAdminEventsResponse.dto";
import { VenueDTO, VenueDTOSchema } from "@/dto/venue/Venue.dto";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useCallback } from "react";
import { SearchUserQueryResponseDTOSchema } from "@/dto/analytics/queryResponse/SearchUserQueryResponse.dto";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL || "";
const ANALYTICS_BASE_URL = process.env.NEXT_PUBLIC_ANALYTICS_BASE_URL || "";

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

  // Analytics calls

  const getAllCampaigns = useCallback(async () => {
    const { data } = await axios.get(
      `${ANALYTICS_BASE_URL}/api/admin/campaigns`,
      {
        headers: { "Admin-Key": adminKey },
      }
    );
    const dataValidated = GetAllCampaignsDTOSchema.parse(data);
    return dataValidated;
  }, [adminKey]);

  const createCampaign = useCallback(
    async (data: CreateCampaignDTO) => {
      const { data: response } = await axios.post(
        `${ANALYTICS_BASE_URL}/api/admin/campaign`,
        data,
        {
          headers: { "Admin-Key": adminKey },
        }
      );
      const responseValidated = CreateCampaignResponseDTOSchema.parse(response);
      return responseValidated;
    },
    [adminKey]
  );

  const querySessions = useCallback(
    async (data: AnalyticsQueryDTO) => {
      const { data: response } = await axios.post(
        `${ANALYTICS_BASE_URL}/api/admin/query/session`,
        data,
        {
          headers: { "Admin-Key": adminKey },
        }
      );
      const responseValidated = SessionQueryResponseDTOSchema.parse(response);
      return responseValidated;
    },
    [adminKey]
  );

  const querySearchUserEvents = useCallback(
    async (data: AnalyticsQueryDTO) => {
      const { data: response } = await axios.post(
        `${ANALYTICS_BASE_URL}/api/admin/query/search-user`,
        data,
        {
          headers: { "Admin-Key": adminKey },
        }
      );
      const responseValidated =
        SearchUserQueryResponseDTOSchema.parse(response);
      return responseValidated;
    },
    [adminKey]
  );

  const getSessionLogs = useCallback(
    async (sessionId: number): Promise<string> => {
      const { data } = await axios.get(
        `${ANALYTICS_BASE_URL}/api/admin/query/session/${sessionId}/logs`,
        {
          headers: { "Admin-Key": adminKey },
        }
      );
      return data;
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
    getAllCampaigns,
    createCampaign,
    querySessions,
    querySearchUserEvents,
    getSessionLogs,
  };
}
