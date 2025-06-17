import { Checkbox, Stack, Typography } from "@mui/material";

interface CheckboxGroupProps {
  labels: string[];
  selectedLabels: string[];
  setSelectedLabels: (newSelectedLabels: string[]) => void;
}

export default function CheckboxGroup({
  labels,
  selectedLabels,
  setSelectedLabels,
}: CheckboxGroupProps) {
  return (
    <Stack direction={"column"}>
      {labels.map((label, index) => {
        return (
          <Stack direction={"row"} display={"flex"} alignItems={"center"}>
            <Checkbox
              key={index}
              checked={selectedLabels.includes(label)}
              onChange={() => {
                if (selectedLabels.includes(label)) {
                  const newSelectedLabels = selectedLabels.filter(
                    (selectedLabel) => selectedLabel !== label
                  );
                  setSelectedLabels(newSelectedLabels);
                } else {
                  const newSelectedLabels = [...selectedLabels, label];
                  setSelectedLabels(newSelectedLabels);
                }
              }}
            />
            <Typography>{label}</Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}
