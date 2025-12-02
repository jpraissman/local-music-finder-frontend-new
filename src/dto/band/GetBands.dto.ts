import { z } from "zod";
import { BandDTOSchema } from "./Band.dto";

export const SearchBandsResponseDTOSchema = z.object({
  bands: z.array(BandDTOSchema),
});

export type SearchBandsResponseDTO = z.infer<
  typeof SearchBandsResponseDTOSchema
>;
