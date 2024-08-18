"use client";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface CustomInputProps {
  id: string;
  label: string;
  error: boolean;
  value: string;
  setValue: (newValue: string) => void;
  helperText: string;
  allValues: string[];
}

const Picklist: React.FC<CustomInputProps> = ({
  id,
  label,
  error,
  value,
  setValue,
  helperText,
  allValues,
}) => {
  return (
    <FormControl fullWidth required error={error}>
      <InputLabel id={id + "-label"}>{label}</InputLabel>
      <Select
        labelId={id + "-label"}
        id={id}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
        sx={{ textAlign: "left" }}
      >
        {allValues.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={error}>
        {error ? "This field is required." : helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default Picklist;
