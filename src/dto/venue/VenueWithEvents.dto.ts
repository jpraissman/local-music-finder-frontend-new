import { z } from "zod";
import { EventDTOSchema } from "../event/Event.dto";
import { VenueDTOSchema } from "./Venue.dto";

export const VenueWithEventsDTOSchema = z.object({
  venueInfo: VenueDTOSchema,
  events: z.array(EventDTOSchema),
});

export type VenueWithEventsDTO = z.infer<typeof VenueWithEventsDTOSchema>;
