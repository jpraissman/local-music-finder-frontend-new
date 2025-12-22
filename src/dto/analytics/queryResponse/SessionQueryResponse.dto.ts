import z from "zod";
import { QueryDetailDTOSchema } from "./QueryDetail.dto";
import { BaseQueryResponseDTOSchema } from "./BaseQueryResponse.dto";
import { BasicSessionDTOSchema } from "../session/BasicSession.dto";

export const SessionQueryResponseDTOSchema = BaseQueryResponseDTOSchema.extend({
  pathDetails: z.array(QueryDetailDTOSchema),
  sessions: z.array(BasicSessionDTOSchema),
});

export type SessionQueryResponseDTO = z.infer<
  typeof SessionQueryResponseDTOSchema
>;
