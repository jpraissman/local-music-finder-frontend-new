"use client";

import { TextField } from "@mui/material";
import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface TextFieldWithAutofillProps<TFieldValues extends FieldValues> {
  id: string;
  label: string;
  error: boolean;
  value: string | undefined;
  rhfName: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
}

export default function TextFieldWithAutofill<
  TFieldValues extends FieldValues
>({
  id,
  label,
  error,
  rhfName,
  register,
  value,
}: TextFieldWithAutofillProps<TFieldValues>) {
  const [focused, setFocused] = useState(false);

  return (
    <TextField
      fullWidth
      id={id}
      label={label}
      error={error}
      helperText={error ? "This field is required." : undefined}
      {...register(rhfName)}
      slotProps={{
        inputLabel: { shrink: (value && value.length > 0) || focused },
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}
