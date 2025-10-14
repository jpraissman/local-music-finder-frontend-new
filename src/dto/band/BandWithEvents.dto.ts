import { z } from "zod";
import { BandDTOSchema } from "./Band.dto";
import { EventDTOSchema } from "../event/Event.dto";

export const BandWithEventsDTOSchema = z.object({
  bandInfo: BandDTOSchema,
  events: z.array(EventDTOSchema),
});

export type BandWithEventsDTO = z.infer<typeof BandWithEventsDTOSchema>;
