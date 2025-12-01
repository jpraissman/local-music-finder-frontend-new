import { z } from "zod";

export const requiredString = (maxChars: number) =>
  z
    .string({ error: "This is required" })
    .min(1, { error: "This is required" })
    .max(maxChars, {
      error: `Input should not be over ${maxChars} characters.`,
    })
    .trim();
