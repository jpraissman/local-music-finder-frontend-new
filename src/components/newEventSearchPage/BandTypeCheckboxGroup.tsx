import { useAnalyticsContext } from "@/context/AnalyticsContext";
import { useFiltersContext } from "@/context/FiltersContext";
import { BandType, BandTypeLabels } from "@/newTypes/BandType";
import { Checkbox, Stack, Typography } from "@mui/material";

interface BandTypeCheckboxGroupProps {
  canEdit: () => boolean;
}

export default function BandTypeCheckboxGroup({
  canEdit,
}: BandTypeCheckboxGroupProps) {
  const { filters, setFilters } = useFiltersContext();
  const { addSessionActivity } = useAnalyticsContext();

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
                if (canEdit()) {
                  if (filters.bandTypes.includes(bandType)) {
                    addSessionActivity(
                      `User removed the ${BandTypeLabels[bandType]} bandType from their filters.`
                    );
                    const newBandTypes = filters.bandTypes.filter(
                      (selectedBandType) => selectedBandType !== bandType
                    );
                    setFilters((prev) => ({
                      ...prev,
                      bandTypes: newBandTypes,
                    }));
                  } else {
                    addSessionActivity(
                      `User added the ${BandTypeLabels[bandType]} bandType to their filters.`
                    );
                    const newBandTypes = [...filters.bandTypes, bandType];
                    setFilters((prev) => ({
                      ...prev,
                      bandTypes: newBandTypes,
                    }));
                  }
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
