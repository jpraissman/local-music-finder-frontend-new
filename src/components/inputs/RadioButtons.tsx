import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ChangeEvent } from "react";

interface RadioButtonProps {
  values: string[];
  labels: string[];
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>, newValue: string) => void;
}

export default function RadioButtons({
  onChange,
  value,
  values,
  labels,
}: RadioButtonProps) {
  return (
    <FormControl>
      <RadioGroup name="radio-buttons" value={value} onChange={onChange}>
        {values.map((value, index) => {
          return (
            <FormControlLabel
              key={index}
              value={value}
              control={<Radio />}
              label={labels[index]}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
