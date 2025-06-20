import { Button, Chip, Stack } from "@mui/material";

interface MultiSelectChipsProps {
  chips: string[];
  selectedChips: string[];
  setSelectedChips: (newSelectedChips: string[]) => void;
}

export default function MultiSelectChips({
  chips,
  selectedChips,
  setSelectedChips,
}: MultiSelectChipsProps) {
  return (
    <Stack display={"flex"} alignItems={"center"} spacing={2}>
      <Stack direction={"row"} useFlexGap flexWrap={"wrap"} spacing={1}>
        {chips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            size="small"
            clickable
            onClick={() => {
              if (selectedChips.includes(chip)) {
                const newSelectedChips = selectedChips.filter(
                  (selectedChip) => selectedChip !== chip
                );
                setSelectedChips(newSelectedChips);
              } else {
                const newSelectedChips = [...selectedChips, chip];
                setSelectedChips(newSelectedChips);
              }
            }}
            variant={selectedChips.includes(chip) ? "filled" : "outlined"}
            sx={{
              backgroundColor: selectedChips.includes(chip)
                ? "secondary.main"
                : "transparent",
              "&:hover": {
                backgroundColor: selectedChips.includes(chip)
                  ? "secondary.dark"
                  : "secondary.light",
              },
            }}
          />
        ))}
      </Stack>
      {selectedChips.length > 0 && (
        <Button
          variant="contained"
          color="secondary"
          sx={{ maxWidth: "200px" }}
          onClick={() => setSelectedChips([])}
        >
          Reset
        </Button>
      )}
    </Stack>
  );
}
