import z from "zod";

export const AnalyticsQueryDTOSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  platform: z.string().nullable(),
  subgroup: z.string().nullable(),
  postMemo: z.string().nullable(),
});

export type AnalyticsQueryDTO = z.infer<typeof AnalyticsQueryDTOSchema>;
