import { z } from "zod";

export const SessionHeartbeatDTOSchema = z.object({
  userId: z.uuid(),
  activityOverview: z.string(),
});

export type SessionHeartbeatDTO = z.infer<typeof SessionHeartbeatDTOSchema>;
