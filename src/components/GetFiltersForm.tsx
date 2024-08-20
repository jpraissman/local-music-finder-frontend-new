import { Stack, Button, Typography } from "@mui/material";
import { useState } from "react";
import MultiselectPicklist from "@/components/MultiselectPicklist";
import Picklist from "@/components/Picklist";
import Filters from "@/types/Filters";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import PlaceType from "@/types/PlaceType";
import {
  CalendarMonth,
  Group,
  House,
  MusicNote,
  Place,
  Search,
} from "@mui/icons-material";
import { BAND_TYPES, GENRES } from "@/types/constants";
import { useRouter } from "next/navigation";

interface CustomInputProps {
  initialFilters: Filters;
}

const GetFiltersForm: React.FC<CustomInputProps> = ({ initialFilters }) => {
  const router = useRouter();

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleGenresChange = (newGenres: string[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      genres: newGenres,
    }));
  };

  const handleBandTypesChange = (newBandTypes: string[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      bandTypes: newBandTypes,
    }));
  };

  const handleDateRangeChange = (newDateRange: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      dateRange: newDateRange,
    }));
  };

  const handleAddressChange = (newAddress: PlaceType | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      address: newAddress,
    }));
  };

  const handleMaxDistanceChange = (newMaxDistance: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      maxDistance: newMaxDistance,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);

    if (
      filters.bandTypes.length > 0 &&
      filters.maxDistance !== "" &&
      filters.dateRange !== "" &&
      filters.genres.length > 0 &&
      filters.address !== null
    ) {
      router.push(
        `/find/${filters.address.description}/${filters.maxDistance}/${
          filters.dateRange
        }/${filters.genres.join(",")}/${filters.bandTypes.join(",")}`
      );
    }
  };

  return (
    <Stack direction="column" spacing={2.2} alignItems="center">
      <Typography variant="h5" sx={{ paddingBottom: 2, fontWeight: "bold" }}>
        Search For An Event
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CalendarMonth color="primary" />
        <Picklist
          id="date-range-filter"
          label="Date"
          error={filters.dateRange === "" && submitted}
          value={filters.dateRange}
          setValue={handleDateRangeChange}
          helperText=""
          allValues={[
            "Today",
            "Tomorrow",
            "This Weekend (Fri-Sun)",
            "Next Weekend (Fri-Sun)",
            "This Week (Mon-Sun)",
            "Next Week (Mon-Sun)",
            "Next 30 Days",
            "All Future Dates",
          ]}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <House color="secondary" />
        <AddressAutocomplete
          id="address-filter"
          label="Location *"
          address={filters.address}
          error={filters.address === null && submitted}
          onAddressChange={handleAddressChange}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Place color="secondary" />
        <Picklist
          id="max-distance-filter"
          label="Distance"
          error={filters.maxDistance === "" && submitted}
          value={filters.maxDistance}
          setValue={handleMaxDistanceChange}
          helperText=""
          allValues={["5 mi", "10 mi", "20 mi", "35 mi", "50 mi", "100 mi"]}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <MusicNote color="action" />
        <MultiselectPicklist
          label="Genre(s)"
          allLabel="All Genres"
          allValues={["All Genres", ...GENRES]}
          selectedValues={filters.genres}
          setValues={handleGenresChange}
          error={filters.genres.length === 0 && submitted}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Group color="action" />
        <MultiselectPicklist
          label="Band Type(s)"
          allLabel="All Types"
          allValues={["All Types", ...BAND_TYPES]}
          selectedValues={filters.bandTypes}
          setValues={handleBandTypesChange}
          error={filters.bandTypes.length === 0 && submitted}
        />
      </Stack>
      <Button variant="contained" endIcon={<Search />} onClick={handleSubmit}>
        Find Events
      </Button>
    </Stack>
  );
};

export default GetFiltersForm;
