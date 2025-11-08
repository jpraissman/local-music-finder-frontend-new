"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FreeSoloAutocompleteProps<T extends FieldValues> {
  rhfName: Path<T>;
  control: Control<T>;
  id: string;
  label: string;
  options: string[];
  error: boolean;
  handleSelect: (newValue: string | null) => void;
  errorText?: string;
}

export default function FreeSoloAutocomplete<T extends FieldValues>(
  props: FreeSoloAutocompleteProps<T>
) {
  return (
    <Controller
      name={props.rhfName}
      control={props.control}
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
              helperText={
                props.error
                  ? props.errorText || "This field is required."
                  : undefined
              }
              inputRef={ref}
            />
          )}
          onInputChange={(_, newInputValue) => {
            onChange(newInputValue);
          }}
          onChange={(_, newValue) => {
            props.handleSelect(newValue);
          }}
          value={value ? value : ""}
        />
      )}
    />
  );
}
