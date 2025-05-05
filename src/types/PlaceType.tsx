import { z } from "zod";

const mainTextMatchedSubstringsSchema = z.object({
  offset: z.number(),
  length: z.number(),
});

const structuredFormattingSchema = z.object({
  main_text: z.string(),
  secondary_text: z.string().optional(),
  main_text_matched_substrings: z.array(mainTextMatchedSubstringsSchema),
});

export const placeTypeSchema = z.object({
  description: z.string(),
  structured_formatting: structuredFormattingSchema,
  place_id: z.string(),
});

export type PlaceType = z.infer<typeof placeTypeSchema>;
