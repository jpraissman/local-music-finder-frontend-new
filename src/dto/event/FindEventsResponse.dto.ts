import { z } from "zod";
import { EventDTOSchema } from "./Event.dto";

export const FindEventsResponseDTOSchema = z.object({
  events: z.array(EventDTOSchema),
});

export type FindEventsResponseDTO = z.infer<typeof FindEventsResponseDTOSchema>;
