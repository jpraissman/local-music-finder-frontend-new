import { BandType, Genre } from "@/newTypes";
import { z } from "zod";

export const BandDTOSchema = z.object({
  id: z.number().int(),
  bandName: z.string(),
  bandType: z.nativeEnum(BandType),
  tributeBandName: z.string().nullable().optional(),
  genres: z.array(z.nativeEnum(Genre)),
  facebookUrl: z.string().nullable().optional(),
  instagramUrl: z.string().nullable().optional(),
  websiteUrl: z.string().nullable().optional(),
  youtubeVideoIds: z.array(z.string()),
});

export type BandDTO = z.infer<typeof BandDTOSchema>;
