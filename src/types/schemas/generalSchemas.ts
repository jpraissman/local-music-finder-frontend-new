import dayjs from "dayjs";
import { z } from "zod";

export const dayjsDateSchema = z.custom<dayjs.Dayjs>((date) => {
  return dayjs.isDayjs(date) && date.isValid() && (date.isSame(dayjs(), 'day') || date.isAfter(dayjs(), 'day'))
}, {
  message: "You must select a date today or later."
})

export const dayjsTimeSchema = z.custom<dayjs.Dayjs>((date) => {
  return dayjs.isDayjs(date) && date.isValid()
}, {
  message: "Invalid Dayjs object."
})

export const phoneSchema = z.union([z.literal(""), z.string().regex(/^\d{3}-\d{3}-\d{4}$/, {
  message: "Phone number must be in the format 123-456-7890",
})]);

export const facebookUrlSchema = z
  .string()
  .regex(
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*facebook\.com\/[A-Za-z0-9\.]+\/?$/,
    { message: "Must be a valid Facebook link" }
  );

export const instagramUrlSchema = z
  .string()
  .regex(
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*instagram\.com\/[A-Za-z0-9\.]+\/?$/,
    { message: "Must be a valid Facebook link" }
  );

export const urlSchema = z
  .string()
  .regex(
    /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
    { message: "Must be a valid-looking URL" }
  );