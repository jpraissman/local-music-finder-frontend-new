import { Stack, Button, Typography, CircularProgress } from "@mui/material";
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
import { usePathname } from "next/navigation";

interface CustomInputProps {
  initialFilters: Filters;
  hideFiltersForm: () => void;
}

const GetFiltersForm: React.FC<CustomInputProps> = ({
  initialFilters,
  hideFiltersForm,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);

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
    let bandTypes = filters.bandTypes.join(",");
    let genres = filters.genres.join(",");
    let maxDistance = filters.maxDistance;
    let dateRange = filters.dateRange;

    if (filters.address !== null && filters.address.description !== "") {
      if (filters.bandTypes.length <= 0) {
        handleBandTypesChange(["All Types"]);
        bandTypes = "All Types";
      }
      if (filters.genres.length <= 0) {
        handleGenresChange(["All Genres"]);
        genres = "All Genres";
      }
      if (filters.maxDistance === "") {
        handleMaxDistanceChange("35 mi");
        maxDistance = "35 mi";
      }
      if (filters.dateRange === "") {
        handleDateRangeChange("This Week (Mon-Sun)");
        dateRange = "This Week (Mon-Sun)";
      }

      const url =
        `/find/${filters.address.description}/${maxDistance}/${dateRange}/${genres}/${bandTypes}`.replaceAll(
          " ",
          "%20"
        );

      if (url === pathname) {
        hideFiltersForm();
      } else {
        setFetching(true);
        router.push(url);
      }
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
          label="When?"
          error={false}
          required={false}
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
            "Next 60 Days",
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
          label="Your Location (town, city, or zip) *"
          address={filters.address}
          error={
            (filters.address === null || filters.address.description === "") &&
            submitted
          }
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
          label="Distance you'd travel?"
          error={false}
          required={false}
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
          error={false}
          required={false}
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
          error={false}
          required={false}
        />
      </Stack>
      {!fetching && (
        <Button variant="contained" endIcon={<Search />} onClick={handleSubmit}>
          Find Events
        </Button>
      )}
      {fetching && <CircularProgress />}
    </Stack>
  );
};

export default GetFiltersForm;
