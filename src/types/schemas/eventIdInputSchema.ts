import { z } from "zod";

export const eventIdInputSchema = z.object({
  eventId: z.string().min(8),
});

export type EventIdInputFields = z.infer<typeof eventIdInputSchema>;
