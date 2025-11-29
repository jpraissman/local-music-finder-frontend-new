"use client";

import { TextField } from "@mui/material";
import { useState } from "react";
import {
  FieldValues,
  Path,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import type { TextFieldProps } from "@mui/material";
import { UpsertEventRequestDTO } from "@/dto/event/UpsertEventRequest.dto";

interface TextFieldWithAutofillProps<TFieldValues extends FieldValues>
  extends Pick<TextFieldProps, "slotProps"> {
  id: string;
  label: string;
  error: boolean;
  value: string | undefined;
  rhfName: Path<TFieldValues>;
  helperText: string | undefined;
}

export default function TextFieldWithAutofill<
  TFieldValues extends FieldValues
>({
  id,
  label,
  error,
  rhfName,
  value,
  helperText,
  slotProps,
}: TextFieldWithAutofillProps<TFieldValues>) {
  const [focused, setFocused] = useState(false);
  const { register } = useFormContext<TFieldValues>();

  return (
    <TextField
      fullWidth
      id={id}
      label={label}
      error={error}
      helperText={helperText}
      {...register(rhfName, {
        setValueAs: (v) => (v ? v : undefined),
      })}
      slotProps={{
        ...slotProps,
        inputLabel: { shrink: (value && value.length > 0) || focused },
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}
