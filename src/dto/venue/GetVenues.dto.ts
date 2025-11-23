import { z } from "zod";
import { VenueDTOSchema } from "./Venue.dto";

export const GetVenuesDTOSchema = z.object({
  venues: z.record(z.string(), VenueDTOSchema),
});

export type GetVenuesDTO = z.infer<typeof GetVenuesDTOSchema>;
