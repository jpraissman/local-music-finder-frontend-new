import z from "zod";

export const BasicSessionDTOSchema = z.object({
  sessionId: z.number(),
  userId: z.uuid(),
  durationInSec: z.number(),
  urlEntry: z.string(),
  platform: z.string(),
  ipAddress: z.string(),
  numScrolls: z.number(),
  newSession: z.boolean(),
});

export type BasicSessionDTO = z.infer<typeof BasicSessionDTOSchema>;
