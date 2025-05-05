"use client";

import { TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface CurrencyFieldProps<TFieldValues extends FieldValues> {
  id: string;
  label: string;
  error: boolean;
  control: Control<TFieldValues>;
  rhfName: Path<TFieldValues>;
}

export default function CurrencyField<TFieldValues extends FieldValues>({
  id,
  label,
  error,
  control,
  rhfName,
}: CurrencyFieldProps<TFieldValues>) {
  const handleChange = (
    newValue: string,
    setValue: (newValue: string) => void
  ) => {
    const firstChar = newValue.substring(0, 1);
    if (!Number.isNaN(Number(firstChar))) {
      setValue(firstChar);
    } else {
      const strValue = newValue.substring(1);
      const numValue = Number(strValue);
      const decimalIndex = strValue.indexOf(".");
      const lengthAfterDecimal = strValue.substring(decimalIndex + 1).length;
      if (!Number.isNaN(numValue) || strValue === "") {
        if (decimalIndex === -1 || lengthAfterDecimal <= 2) {
          setValue(strValue);
        }
      }
    }
  };

  return (
    <Controller
      name={rhfName}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <TextField
          id={id}
          label={label}
          fullWidth
          error={error}
          variant="outlined"
          value={value === "" ? "" : "$" + value}
          onChange={(event) => handleChange(event.target.value, onChange)}
          helperText={error ? "This field is required." : ""}
          inputRef={ref}
        />
      )}
    />
  );
}
