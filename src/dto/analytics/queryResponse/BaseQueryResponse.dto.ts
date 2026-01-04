import z from "zod";
import { QueryDetailDTOSchema } from "./QueryDetail.dto";

export const BaseQueryResponseDTOSchema = z.object({
  total: z.number(),
  totalUnique: z.number(),
  totalUniqueNew: z.number(),
  totalUniqueReturning: z.number(),
  totalUniqueMobile: z.number(),
  avgDurationInSec: z.number(),
  sublayerDetails: z.array(QueryDetailDTOSchema),
});

export type BaseQueryResponseDTO = z.infer<typeof BaseQueryResponseDTOSchema>;
