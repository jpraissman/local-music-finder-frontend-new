import z from "zod";
import { EventDTOSchema } from "./Event.dto";

export const AdminEventDTOSchema = EventDTOSchema.extend({
  eventCode: z.string(),
});

export type AdminEventDTO = z.infer<typeof AdminEventDTOSchema>;
