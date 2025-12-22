import z from "zod";

export const BasicSessionDTOSchema = z.object({
  sessionId: z.number(),
  userId: z.uuid(),
  durationInSec: z.number(),
  urlEntry: z.string(),
  platform: z.string(),
});

export type BasicSessionDTO = z.infer<typeof BasicSessionDTOSchema>;
