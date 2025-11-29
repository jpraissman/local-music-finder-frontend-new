import { z } from "zod";

export const CreateEventResponseDTOSchema = z.object({
  eventCode: z.string().min(1).max(20),
});

export type CreateEventResponseDTO = z.infer<
  typeof CreateEventResponseDTOSchema
>;
