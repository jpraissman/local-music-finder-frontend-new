import z from "zod";
import { QueryDetailDTOSchema } from "./QueryDetail.dto";

export const BaseQueryResponseDTOSchema = z.object({
  total: z.number(),
  totalUnique: z.number(),
  sublayerDetails: z.array(QueryDetailDTOSchema),
});

export type BaseQueryResponseDTO = z.infer<typeof BaseQueryResponseDTOSchema>;
