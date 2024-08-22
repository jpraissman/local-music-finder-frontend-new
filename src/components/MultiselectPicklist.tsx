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

interface CustomInputProps {
  label: string;
  allLabel: string;
  allValues: string[];
  selectedValues: string[];
  setValues: (newValues: string[]) => void;
  error: boolean;
}

const MultiselectPicklist: React.FC<CustomInputProps> = ({
  label,
  allLabel,
  allValues,
  selectedValues,
  setValues,
  error,
}) => {
  const handleChange = (values: string[] | string) => {
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
    <FormControl fullWidth required error={error}>
      <InputLabel id="filter-label">{label}</InputLabel>
      <Select
        labelId="filter-label"
        id="filter"
        multiple
        value={selectedValues}
        onChange={(event) => handleChange(event.target.value)}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        sx={{ textAlign: "left" }}
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
  );
};

export default MultiselectPicklist;
