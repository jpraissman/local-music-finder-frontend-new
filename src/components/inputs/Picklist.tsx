"use client";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "50vh",
      width: 250,
    },
  },
};

interface PicklistProps<TFieldValues extends FieldValues> {
  id: string;
  label: string;
  error: boolean;
  allValues: string[];
  control: Control<TFieldValues>;
  rhfName: Path<TFieldValues>;
}

export default function Picklist<TFieldValues extends FieldValues>({
  id,
  label,
  error,
  allValues,
  control,
  rhfName,
}: PicklistProps<TFieldValues>) {
  return (
    <Controller
      name={rhfName}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <FormControl fullWidth error={error}>
          <InputLabel id={id + "-label"}>{label}</InputLabel>
          <Select
            labelId={id + "-label"}
            id={id}
            value={value ? value : ""}
            onChange={(event) => onChange(event.target.value)}
            input={<OutlinedInput label={label} />}
            MenuProps={MenuProps}
            sx={{ textAlign: "left" }}
            inputRef={ref}
          >
            {allValues.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={error}>
            {error ? "This field is required." : undefined}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
