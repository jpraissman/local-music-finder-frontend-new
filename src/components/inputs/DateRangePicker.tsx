"use client";

import { formatDateRange } from "@/lib/date-helpers";
import { Button, Modal, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface DateRangePickerProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  rhfName: Path<TFieldValues>;
  label: string;
  error: boolean;
  errorMsg: string | undefined;
  initialValue: DateRange | undefined;
}

export default function DateRangePicker<TFieldValues extends FieldValues>({
  control,
  rhfName,
  label,
  error,
  errorMsg,
  initialValue,
}: DateRangePickerProps<TFieldValues>) {
  const [selected, setSelected] = useState(false);
  const [dateRangeFormatted, setDateRangeFormatted] = useState<string>(
    initialValue ? formatDateRange(initialValue) : ""
  );

  return (
    <>
      <TextField
        label={label}
        fullWidth
        onClick={() => setSelected(true)}
        value={dateRangeFormatted}
        error={error}
        helperText={errorMsg}
      />
      <Modal
        open={selected}
        onClose={() => setSelected(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction={"column"}
          spacing={2}
          sx={{
            backgroundColor: "white",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Controller
            name={rhfName}
            control={control}
            render={({ field: { value, onChange } }) => (
              <DayPicker
                mode="range"
                selected={value}
                disabled={{ before: new Date() }}
                onSelect={(newDateRange) => {
                  onChange(newDateRange ? newDateRange : null);
                  setDateRangeFormatted(
                    newDateRange ? formatDateRange(newDateRange) : ""
                  );
                }}
              />
            )}
          />
          <Button
            sx={{ maxWidth: "70%" }}
            variant="contained"
            onClick={() => {
              setSelected(false);
            }}
          >
            Select
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
