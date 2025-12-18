import {
  CreateCampaignUserEventDTO,
  CreateCampaignUserEventDTOSchema,
} from "@/dto/analytics/sendEvent/CreateCampaignUserEvent.dto";
import { CreateUserResponseDTOSchema } from "@/dto/analytics/CreateUserResponse.dto";
import {
  AddVideoRequestDTO,
  AddVideoRequestDTOSchema,
} from "@/dto/band/AddVideoRequest.dto";
import {
  BandWithEventsDTO,
  BandWithEventsDTOSchema,
} from "@/dto/band/BandWithEvents.dto";
import { SearchBandsResponseDTOSchema } from "@/dto/band/GetBands.dto";
import { CreateEventResponseDTOSchema } from "@/dto/event/CreateEventResponse.dto";
import { MultiEventsResponseDTOSchema } from "@/dto/event/MultiEventsResponse.dto";
import {
  UpsertEventRequestDTOInput,
  UpsertEventRequestDTOSchema,
} from "@/dto/event/UpsertEventRequest.dto";
import { LocationDTOSchema } from "@/dto/location/Location.dto";
import { SearchVenuesResponseDTOSchema } from "@/dto/venue/GetVenues.dto";
import {
  VenueWithEventsDTO,
  VenueWithEventsDTOSchema,
} from "@/dto/venue/VenueWithEvents.dto";
import { sortEventsByDate } from "@/lib/sort-events";
import axios from "axios";
import {
  CreateSearchUserEventDTO,
  CreateSearchUserEventDTOSchema,
} from "@/dto/analytics/sendEvent/CreateSearchUserEvent.dto";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL || "";
const ANALYTICS_BASE_URL = process.env.NEXT_PUBLIC_ANALYTICS_BASE_URL || "";

export const searchBands = async (bandNameQuery: string) => {
  const encodedQuery = encodeURIComponent(bandNameQuery);
  const { data } = await axios.get(
    `${BASE_URL}/api/bands/search?bandNameQuery=${encodedQuery}`
  );
  return SearchBandsResponseDTOSchema.parse(data);
};

export const searchVenues = async (venueNameQuery: string) => {
  const encodedQuery = encodeURIComponent(venueNameQuery);
  const { data } = await axios.get(
    `${BASE_URL}/api/venues/search?venueNameQuery=${encodedQuery}`
  );
  return SearchVenuesResponseDTOSchema.parse(data);
};

export const getEventByEventCode = async (eventCode: string) => {
  const { data } = await axios.get(`${BASE_URL}/api/events/${eventCode}`);
  return UpsertEventRequestDTOSchema.parse(data);
};

export const editEvent = async (
  eventCode: string,
  data: UpsertEventRequestDTOInput
): Promise<void> => {
  const dataValidated = UpsertEventRequestDTOSchema.parse(data);
  await axios.put(`${BASE_URL}/api/events/${eventCode}`, dataValidated);
};

export const deleteEvent = async (eventCode: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/api/events/${eventCode}`);
};

export const createEvent = async (data: UpsertEventRequestDTOInput) => {
  const dataValidated = UpsertEventRequestDTOSchema.parse(data);
  const response = await axios.post(`${BASE_URL}/api/events`, dataValidated);
  return CreateEventResponseDTOSchema.parse(response.data);
};

export const postVideo = async (
  bandId: number | null,
  data: AddVideoRequestDTO
) => {
  const dataValidated = AddVideoRequestDTOSchema.parse(data);
  await axios.post(`${BASE_URL}/api/bands/${bandId}/add-video`, dataValidated);
};

export const getLocationById = async (locationId: string) => {
  const response = await axios.get(`${BASE_URL}/api/location/${locationId}`);
  return LocationDTOSchema.parse(response.data);
};

export const findEvents = async (locationId: string | undefined) => {
  if (!locationId) {
    return MultiEventsResponseDTOSchema.parse({ events: [] }).events;
  }

  const { data } = await axios.get(
    `${BASE_URL}/api/events/find?locationId=${locationId}`
  );
  return sortEventsByDate(MultiEventsResponseDTOSchema.parse(data).events);
};

export const getEventsNextSevenDays = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/events/next-seven-days`);
  return sortEventsByDate(MultiEventsResponseDTOSchema.parse(data).events);
};

export const getUpcomingRandomEvents = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/events/random`);
  return sortEventsByDate(MultiEventsResponseDTOSchema.parse(data).events);
};

export const getEventsByCountiesAndNext30Days = async (counties: string) => {
  const { data } = await axios.get(`${BASE_URL}/api/events/county/${counties}`);
  return sortEventsByDate(MultiEventsResponseDTOSchema.parse(data).events);
};

export const getEventsByIds = async (ids: string) => {
  const { data } = await axios.get(`${BASE_URL}/api/events/ids/${ids}`);
  return sortEventsByDate(MultiEventsResponseDTOSchema.parse(data).events);
};

export const getBandById = async (id: number): Promise<BandWithEventsDTO> => {
  const { data } = await axios.get(`${BASE_URL}/api/bands/${id}`);
  const band = BandWithEventsDTOSchema.parse(data);
  return { ...band, events: sortEventsByDate(band.events) };
};

export const getVenueById = async (id: number): Promise<VenueWithEventsDTO> => {
  const { data } = await axios.get(`${BASE_URL}/api/venues/${id}`);
  const venue = VenueWithEventsDTOSchema.parse(data);
  return { ...venue, events: sortEventsByDate(venue.events) };
};

export const validateAdminKey = async (key: string | undefined) => {
  await axios.get(`${BASE_URL}/api/admin/validate`, {
    headers: {
      "Admin-Key": key,
    },
  });
};

export const getEventsCsv = async (key: string | undefined) => {
  const { data } = await axios.get(`${BASE_URL}/api/admin/event/csv`, {
    headers: { "Admin-Key": key },
    responseType: "blob",
  });

  return data;
};

// Analytics calls

export const createUser = async () => {
  const { data } = await axios.post(`${ANALYTICS_BASE_URL}/api/event/user`);
  const dataValidated = CreateUserResponseDTOSchema.parse(data);
  return dataValidated;
};

export const sendUrlEntryEvent = async (data: CreateCampaignUserEventDTO) => {
  const dataValidated = CreateCampaignUserEventDTOSchema.parse(data);
  await axios.post(
    `${ANALYTICS_BASE_URL}/api/event/campaign-user`,
    dataValidated
  );
};

export const sendSearchUserEvent = async (data: CreateSearchUserEventDTO) => {
  const dataValidated = CreateSearchUserEventDTOSchema.parse(data);
  await axios.post(
    `${ANALYTICS_BASE_URL}/api/event/search-user`,
    dataValidated
  );
};
