"use client";

import { Stack, Button, Typography } from "@mui/material";
import MultiselectPicklist from "@/components/inputs/MultiselectPicklist";
import Picklist from "@/components/inputs/Picklist";
import Filters from "@/types/Filters";
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
import { Controller, useForm } from "react-hook-form";
import {
  SearchFormFields,
  searchFormSchema,
} from "@/types/schemas/searchFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import NewAddressAutocomplete from "./inputs/NewAddressAutocomplete";
import DateRangePicker from "./inputs/DateRangePicker";
import dayjs from "dayjs";

interface CustomInputProps {
  initialFilters: Filters;
}

const GetFiltersForm: React.FC<CustomInputProps> = ({ initialFilters }) => {
  const router = useRouter();

  const { handleSubmit, control, formState, watch } = useForm<SearchFormFields>(
    {
      resolver: zodResolver(searchFormSchema),
      defaultValues: {
        genres: initialFilters.genres,
        bandTypes: initialFilters.bandTypes,
        maxDistance: initialFilters.maxDistance,
        location: initialFilters.address,
        dateRange: initialFilters.dateRange,
      },
    }
  );

  return (
    <Stack
      direction="column"
      spacing={2.2}
      alignItems="center"
      component="form"
      onSubmit={handleSubmit((data) => {
        const fromDate = dayjs(data.dateRange.from).format("YYYY-MM-DD");
        const toDate = dayjs(data.dateRange.to).format("YYYY-MM-DD");
        const maxDistance =
          data.maxDistance === "" ? "35 mi" : data.maxDistance;
        const genres = data.genres.length === 0 ? ["All Genres"] : data.genres;
        const bandTypes =
          data.bandTypes.length === 0 ? ["All Types"] : data.bandTypes;

        // prettier-ignore
        const url = `/find/${data.location.description}/${maxDistance}/${fromDate}/${toDate}/${genres.join(",")}/${bandTypes.join(",")}`.replaceAll(" ", "-");
        router.push(url);
      })}
    >
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
        <DateRangePicker
          label="Select a Date Range *"
          control={control}
          rhfName="dateRange"
          error={!!formState.errors.dateRange}
          errorMsg={formState.errors.dateRange?.message}
          initialValue={watch("dateRange")}
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
        <Controller
          name="location"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <NewAddressAutocomplete
              id="address-filter"
              label="Your Location (town, city, or zip) *"
              value={value ? value : null}
              setValue={onChange}
              error={!!formState.errors.location}
            />
          )}
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
          allValues={["5 mi", "10 mi", "20 mi", "35 mi", "50 mi", "100 mi"]}
          control={control}
          rhfName="maxDistance"
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
          error={false}
          control={control}
          rhfName="genres"
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
          error={false}
          control={control}
          rhfName="bandTypes"
        />
      </Stack>
      <Button variant="contained" endIcon={<Search />} type="submit">
        Find Events
      </Button>
    </Stack>
  );
};

export default GetFiltersForm;
