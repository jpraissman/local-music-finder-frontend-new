import { z } from "zod";
import { BandDTOSchema } from "./Band.dto";

export const GetBandsDTOSchema = z.object({
  bands: z.record(BandDTOSchema),
});

export type GetBandsDTO = z.infer<typeof GetBandsDTOSchema>;

