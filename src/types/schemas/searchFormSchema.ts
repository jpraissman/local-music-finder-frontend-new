import { z } from "zod";
import { placeTypeSchema } from "../PlaceType";

export const searchFormSchema = z.object({
  location: placeTypeSchema,
  maxDistance: z.string().min(1),
  bandTypes: z.array(z.string()).min(1),
  genres: z.array(z.string()).min(1),
  dateRange: z.string().min(1),
})

export type SearchFormFields = z.infer<typeof searchFormSchema>;