import { z } from "zod";
import { AdminEventDTOSchema } from "./AdminEvent.dto";

export const MultiAdminEventsResponseDTOSchema = z.object({
  events: z.array(AdminEventDTOSchema),
});

export type MultiAdminEventsResponseDTO = z.infer<
  typeof MultiAdminEventsResponseDTOSchema
>;
