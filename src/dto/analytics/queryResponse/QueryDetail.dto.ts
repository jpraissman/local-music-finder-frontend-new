import z from "zod";

export const QueryDetailDTOSchema = z.object({
  name: z.string(),
  total: z.number(),
  totalUnique: z.number(),
  totalUniqueNew: z.number(),
  totalUniqueReturning: z.number(),
  totalUniqueMobile: z.number(),
  totalUniqueDurationInSec: z.number(),
});

export type QueryDetailDTO = z.infer<typeof QueryDetailDTOSchema>;
