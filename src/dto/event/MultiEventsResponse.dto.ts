import { z } from "zod";
import { EventDTOSchema } from "./Event.dto";

export const MultiEventsResponseDTOSchema = z.object({
  events: z.array(EventDTOSchema),
});

export type MultiEventsResponseDTO = z.infer<
  typeof MultiEventsResponseDTOSchema
>;
