import { z } from "zod";

export const VenueDTOSchema = z.object({
  id: z.number().int(),
  venueName: z.string(),
  address: z.string(),
  town: z.string(),
  phoneNumber: z.string().nullable().optional(),
  facebookUrl: z.string().nullable().optional(),
  instagramUrl: z.string().nullable().optional(),
  websiteUrl: z.string().nullable().optional(),
});

export type VenueDTO = z.infer<typeof VenueDTOSchema>;
