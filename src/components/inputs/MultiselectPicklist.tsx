"use client";

import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Control, Controller, Field, FieldValues, Path } from "react-hook-form";

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

interface MultiselectPicklistProps<TFieldValues extends FieldValues> {
  label: string;
  allLabel: string;
  allValues: string[];
  error: boolean;
  control: Control<TFieldValues>;
  rhfName: Path<TFieldValues>;
}

export default function MultiselectPicklist<TFieldValues extends FieldValues>({
  label,
  allLabel,
  allValues,
  error,
  control,
  rhfName,
}: MultiselectPicklistProps<TFieldValues>) {
  const handleChange = (
    values: string[] | string,
    setValues: (newValues: string[]) => void
  ) => {
    if (Array.isArray(values)) {
      if (values.indexOf(allLabel) === 0 && values.length > 1) {
        const newValues = values.filter((value) => value !== allLabel);
        setValues(newValues);
      } else if (values.indexOf(allLabel) > -1) {
        setValues([allLabel]);
      } else {
        setValues(values);
      }
    } else {
      console.log("Error");
    }
  };

  return (
    <Controller
      name={rhfName}
      control={control}
      render={({ field: { onChange, value: selectedValues, ref } }) => (
        <FormControl fullWidth error={error}>
          <InputLabel id="filter-label">{label}</InputLabel>
          <Select
            labelId="filter-label"
            id="filter"
            multiple
            value={selectedValues ? selectedValues : []}
            onChange={(event) => handleChange(event.target.value, onChange)}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            sx={{ textAlign: "left" }}
            inputRef={ref}
          >
            {allValues.map((value) => (
              <MenuItem key={value} value={value}>
                <Checkbox checked={selectedValues.indexOf(value) > -1} />
                <ListItemText primary={value} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={error}>
            {error ? "You must select at least one value." : ""}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
