import { z } from "zod";
import { VenueDTOSchema } from "./Venue.dto";

export const SearchVenuesResponseDTOSchema = z.object({
  venues: z.array(VenueDTOSchema),
});

export type SearchVenuesResponseDTO = z.infer<
  typeof SearchVenuesResponseDTOSchema
>;
