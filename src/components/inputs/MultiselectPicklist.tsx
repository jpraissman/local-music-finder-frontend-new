"use client";

import { UpsertEventRequestDTO } from "@/dto/event/UpsertEventRequest.dto";
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

interface MultiselectPicklistProps<TFieldValues extends FieldValues> {
  label: string;
  allValues: string[];
  valueDisplayNames: Record<string, string>;
  error: boolean;
  rhfName: Path<TFieldValues>;
}

export default function MultiselectPicklist<TFieldValues extends FieldValues>({
  label,
  allValues,
  valueDisplayNames,
  error,
  rhfName,
}: MultiselectPicklistProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  const handleChange = (
    values: string[] | string,
    setValues: (newValues: string[]) => void
  ) => {
    if (Array.isArray(values)) {
      setValues(values);
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
            renderValue={(selected: string[]) =>
              selected
                .map((key) => valueDisplayNames[key])
                .filter(Boolean)
                .join(", ")
            }
            MenuProps={MenuProps}
            sx={{ textAlign: "left" }}
            inputRef={ref}
          >
            {allValues.map((value) => (
              <MenuItem key={value} value={value}>
                <Checkbox checked={selectedValues.indexOf(value) > -1} />
                <ListItemText primary={valueDisplayNames[value]} />
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
