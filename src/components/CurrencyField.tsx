"use client";

import { TextField } from "@mui/material";
import React from "react";

interface CustomInputProps {
  id: string;
  label: string;
  error: boolean;
  value: string;
  setValue: (newValue: string) => void;
}

const CurrencyField: React.FC<CustomInputProps> = ({
  id,
  label,
  error,
  value,
  setValue,
}) => {
  const handleChange = (newValue: string) => {
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
    <TextField
      id={id}
      label={label}
      fullWidth
      required
      error={error}
      variant="outlined"
      value={value === "" ? "" : "$" + value}
      onChange={(event) => handleChange(event.target.value)}
      helperText={error ? "This field is required." : ""}
    />
  );
};

export default CurrencyField;
