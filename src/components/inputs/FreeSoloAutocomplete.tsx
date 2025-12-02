"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

interface FreeSoloAutocompleteProps<T extends FieldValues> {
  rhfName: Path<T>;
  id: string;
  label: string;
  options: string[];
  error: boolean;
  helperText?: string;
}

export default function FreeSoloAutocomplete<T extends FieldValues>(
  props: FreeSoloAutocompleteProps<T>
) {
  const { control } = useFormContext<T>();

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
              helperText={props.helperText}
              inputRef={ref}
            />
          )}
          onInputChange={(_, newInputValue) => {
            onChange(newInputValue);
          }}
          value={value ? value : ""}
        />
      )}
    />
  );
}
