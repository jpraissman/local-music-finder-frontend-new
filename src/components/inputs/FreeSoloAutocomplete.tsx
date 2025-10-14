"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";
import { UpsertEventRequestDTO } from "@/dto/event/UpsertEventRequest.dto";

interface FreeSoloAutocompleteProps<T extends FieldValues> {
  rhfName: Path<T>;
  id: string;
  label: string;
  options: string[];
  error: boolean;
  valueChangeCallback: (newValue: string | null) => void;
}

export default function FreeSoloAutocomplete<T extends FieldValues>(
  props: FreeSoloAutocompleteProps<T>
) {
  const { control } = useFormContext<UpsertEventRequestDTO>();

  return (
    <Controller
      name={props.rhfName}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <Autocomplete
          freeSolo
          fullWidth
          multiple={false}
          id={props.id}
          options={value ? props.options : []}
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.label}
              error={props.error}
              helperText={props.error ? "This field is required." : undefined}
              inputRef={ref}
            />
          )}
          onInputChange={(_, newInputValue) => {
            onChange(newInputValue);
            props.valueChangeCallback(newInputValue);
          }}
          value={value ? value : ""}
        />
      )}
    />
  );
}
