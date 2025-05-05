"use client";

import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface RHFDatePickerProps<TFieldValues extends FieldValues> {
  name: string;
  error: boolean;
  label: string;
  rhfName: Path<TFieldValues>;
  control: Control<TFieldValues>;
}

export default function RHFDatePicker<TFieldValues extends FieldValues>(
  props: RHFDatePickerProps<TFieldValues>
) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <Controller
      name={props.rhfName}
      control={props.control}
      render={({ field: { onChange, value, ref } }) => (
        <DesktopDatePicker
          open={calendarOpen}
          onOpen={() => setCalendarOpen(true)}
          onClose={() => setCalendarOpen(false)}
          label={props.label}
          value={value ? value : null}
          onChange={onChange}
          slotProps={{
            textField: {
              onClick: () => setCalendarOpen(true),
              error: props.error,
              helperText: props.error
                ? "You must select a date that hasn't already happened."
                : undefined,
              fullWidth: true,
              inputRef: ref,
            },
          }}
        />
      )}
    />
  );
}
