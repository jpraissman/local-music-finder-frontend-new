"use client";

import { DesktopTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface RHFTimePickerProps<TFieldValues extends FieldValues> {
  name: string;
  error: boolean;
  label: string;
  rhfName: Path<TFieldValues>;
  control: Control<TFieldValues>;
}

export default function RHFTimePicker<TFieldValues extends FieldValues>(
  props: RHFTimePickerProps<TFieldValues>
) {
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <Controller
      name={props.rhfName}
      control={props.control}
      render={({ field: { onChange, value, ref } }) => (
        <DesktopTimePicker
          open={selectorOpen}
          onOpen={() => setSelectorOpen(true)}
          onClose={() => setSelectorOpen(false)}
          label={props.label}
          value={value ? value : null}
          onChange={onChange}
          slotProps={{
            textField: {
              onClick: () => setSelectorOpen(true),
              error: props.error,
              helperText: props.error ? "This field is required." : undefined,
              fullWidth: true,
              inputRef: ref,
            },
          }}
        />
      )}
    />
  );
}
