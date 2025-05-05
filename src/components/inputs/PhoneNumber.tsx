"use client";

import { Phone } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface PhoneNumberProps<TFieldValues extends FieldValues> {
  id: string;
  label: string;
  error: boolean;
  control: Control<TFieldValues>;
  rhfName: Path<TFieldValues>;
}

export default function PhoneNumber<TFieldValues extends FieldValues>(
  props: PhoneNumberProps<TFieldValues>
) {
  const handleChange = (
    newValue: string,
    oldValue: string,
    setValue: (newValue: string) => void
  ) => {
    if (
      newValue.substring(newValue.length - 1, newValue.length) !== "-" ||
      oldValue.length > newValue.length
    ) {
      let value = newValue.replaceAll("-", "");
      if (!Number.isNaN(Number(value)) && value.length <= 10) {
        if (
          (newValue.length === 3 && oldValue.length === 2) ||
          (newValue.length === 7 && oldValue.length === 6)
        ) {
          setValue(newValue + "-");
        } else if (
          (newValue.length === 3 && oldValue.length === 4) ||
          (newValue.length === 7 && oldValue.length === 8)
        ) {
          setValue(newValue.substring(0, newValue.length - 1));
        } else {
          setValue(newValue);
        }
      }
    }
  };

  return (
    <Controller
      name={props.rhfName}
      control={props.control}
      render={({ field: { onChange, value, ref } }) => (
        <TextField
          id={props.id}
          label={props.label}
          fullWidth
          inputRef={ref}
          error={props.error}
          variant="outlined"
          value={value ? value : ""}
          onChange={(event) =>
            handleChange(event.target.value, value, onChange)
          }
          helperText={props.error ? "Please enter a valid phone number" : ""}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Phone />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
}
