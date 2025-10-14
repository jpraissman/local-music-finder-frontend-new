"use client";

import { UpsertEventRequestDTO } from "@/dto/event/UpsertEventRequest.dto";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

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
  valueDisplayNames: Record<string, string>;
  rhfName: Path<TFieldValues>;
  valueSetCallback?: (newValue: string) => void;
}

export default function Picklist<TFieldValues extends FieldValues>({
  id,
  label,
  error,
  allValues,
  valueDisplayNames,
  rhfName,
  valueSetCallback,
}: PicklistProps<TFieldValues>) {
  const { control } = useFormContext<UpsertEventRequestDTO>();

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
            onChange={(event) => {
              onChange(event.target.value);
              if (valueSetCallback) {
                valueSetCallback(event.target.value);
              }
            }}
            input={<OutlinedInput label={label} />}
            MenuProps={MenuProps}
            sx={{ textAlign: "left" }}
            inputRef={ref}
          >
            {allValues.map((value) => (
              <MenuItem key={value} value={value}>
                {valueDisplayNames[value]}
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
