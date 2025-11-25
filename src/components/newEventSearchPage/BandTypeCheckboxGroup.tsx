import { useFiltersContext } from "@/context/FiltersContext";
import { BandType, BandTypeLabels } from "@/newTypes/BandType";
import { Checkbox, Stack, Typography } from "@mui/material";

export default function BandTypeCheckboxGroup() {
  const { filters, setFilters } = useFiltersContext();

  return (
    <Stack direction={"column"}>
      {Object.values(BandType).map((bandType) => {
        return (
          <Stack
            key={BandTypeLabels[bandType]}
            direction={"row"}
            display={"flex"}
            alignItems={"center"}
          >
            <Checkbox
              checked={filters.bandTypes.includes(bandType)}
              onChange={() => {
                if (filters.bandTypes.includes(bandType)) {
                  const newBandTypes = filters.bandTypes.filter(
                    (selectedBandType) => selectedBandType !== bandType
                  );
                  setFilters({ ...filters, bandTypes: newBandTypes });
                } else {
                  const newBandTypes = [...filters.bandTypes, bandType];
                  setFilters({ ...filters, bandTypes: newBandTypes });
                }
              }}
            />
            <Typography>{BandTypeLabels[bandType]}</Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}
