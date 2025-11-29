import z from "zod";
import { requiredString } from "../util";

export const AddVideoRequestDTOSchema = z.object({
  youtubeUrl: requiredString(250),
});

export type AddVideoRequestDTO = z.infer<typeof AddVideoRequestDTOSchema>;
