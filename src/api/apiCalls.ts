import { BandWithEventsDTOSchema } from "@/dto/band/BandWithEvents.dto";
import { GetBandsDTOSchema } from "@/dto/band/GetBands.dto";
import { CreateEventResponseDTOSchema } from "@/dto/event/CreateEventResponse.dto";
import { FindEventsResponseDTOSchema } from "@/dto/event/FindEventsResponse.dto";
import {
  UpsertEventRequestDTOInput,
  UpsertEventRequestDTOSchema,
} from "@/dto/event/UpsertEventRequest.dto";
import { GetVenuesDTOSchema } from "@/dto/venue/GetVenues.dto";
import { VenueDTOSchema } from "@/dto/venue/Venue.dto";
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

export const findEvents = async (address: string | undefined) => {
  if (!address) {
    return FindEventsResponseDTOSchema.parse({ events: [] });
  }

  const encodedAddress = encodeURIComponent(address);
  const { data } = await axios.get(
    `${BASE_URL}/api/events/find?address=${encodedAddress}}`
  );
  return FindEventsResponseDTOSchema.parse(data);
};

export const getBandById = async (id: number) => {
  const { data } = await axios.get(`${BASE_URL}/api/bands/${id}`);
  return BandWithEventsDTOSchema.parse(data);
};

export const getVenueById = async (id: number) => {
  const { data } = await axios.get(`${BASE_URL}/api/venues/${id}`);
  return VenueWithEventsDTOSchema.parse(data);
};
