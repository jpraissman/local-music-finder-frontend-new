import { z } from "zod";

export const StartSessionDTOSchema = z.object({
  userId: z.uuid(),
  campaignId: z.number().nullable(),
  referrer: z.string().nullable(),
  urlEntry: z.string(),
});

export type StartSessionDTO = z.infer<typeof StartSessionDTOSchema>;
