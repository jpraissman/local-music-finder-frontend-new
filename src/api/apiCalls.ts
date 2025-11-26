import { BandWithEventsDTOSchema } from "@/dto/band/BandWithEvents.dto";
import { GetBandsDTOSchema } from "@/dto/band/GetBands.dto";
import { CreateEventResponseDTOSchema } from "@/dto/event/CreateEventResponse.dto";
import { MultiEventsResponseDTOSchema } from "@/dto/event/FindEventsResponse.dto";
import {
  UpsertEventRequestDTOInput,
  UpsertEventRequestDTOSchema,
} from "@/dto/event/UpsertEventRequest.dto";
import { LocationDTOSchema } from "@/dto/location/Location.dto";
import { GetVenuesDTOSchema } from "@/dto/venue/GetVenues.dto";
import { VenueWithEventsDTOSchema } from "@/dto/venue/VenueWithEvents.dto";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL || "";

export const getBands = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/bands`);
  return GetBandsDTOSchema.parse(data);
};

export const getVenues = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/venues`);
  return GetVenuesDTOSchema.parse(data);
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

export const getLocationById = async (locationId: string) => {
  const response = await axios.get(`${BASE_URL}/api/location/${locationId}`);
  return LocationDTOSchema.parse(response.data);
};

export const findEvents = async (locationId: string | undefined) => {
  if (!locationId) {
    return MultiEventsResponseDTOSchema.parse({ events: [] });
  }

  const { data } = await axios.get(
    `${BASE_URL}/api/events/find?locationId=${locationId}`
  );
  return MultiEventsResponseDTOSchema.parse(data);
};

export const getEventsNextSevenDays = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/events/next-seven-days`);
  return MultiEventsResponseDTOSchema.parse(data);
};

export const getEventsByCountiesAndNext30Days = async (counties: string) => {
  const { data } = await axios.get(`${BASE_URL}/api/events/county/${counties}`);
  return MultiEventsResponseDTOSchema.parse(data);
};

export const getEventsByIds = async (ids: string) => {
  const { data } = await axios.get(`${BASE_URL}/api/events/ids/${ids}`);
  return MultiEventsResponseDTOSchema.parse(data);
};

export const getBandById = async (id: number) => {
  const { data } = await axios.get(`${BASE_URL}/api/bands/${id}`);
  return BandWithEventsDTOSchema.parse(data);
};

export const getVenueById = async (id: number) => {
  const { data } = await axios.get(`${BASE_URL}/api/venues/${id}`);
  return VenueWithEventsDTOSchema.parse(data);
};
