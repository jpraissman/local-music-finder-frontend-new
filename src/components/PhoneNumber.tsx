"use client";

import { Phone } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import React from "react";

interface CustomInputProps {
  id: string;
  label: string;
  error: boolean;
  value: string;
  setValue: (newValue: string) => void;
}

const PhoneNumber: React.FC<CustomInputProps> = ({
  id,
  label,
  error,
  value,
  setValue,
}) => {
  const handleChange = (newValue: string, oldValue: string) => {
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
    <TextField
      id={id}
      label={label}
      fullWidth
      error={error}
      variant="outlined"
      value={value}
      onChange={(event) => handleChange(event.target.value, value)}
      helperText={error ? "Please enter a valid phone number" : ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Phone />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PhoneNumber;
