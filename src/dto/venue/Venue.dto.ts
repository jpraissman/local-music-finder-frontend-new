import { z } from "zod";
import { LocationDTOSchema } from "../location/Location.dto";

export const VenueDTOSchema = z.object({
  id: z.number().int(),
  venueName: z.string(),
  location: LocationDTOSchema,
  town: z.string().nullable().optional(),
  county: z.string().nullable().optional(),
  phoneNumber: z.string().nullable().optional(),
  facebookUrl: z.string().nullable().optional(),
  instagramUrl: z.string().nullable().optional(),
  websiteUrl: z.string().nullable().optional(),
});

export type VenueDTO = z.infer<typeof VenueDTOSchema>;
