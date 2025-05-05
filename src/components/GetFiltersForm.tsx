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

interface CustomInputProps {
  initialFilters: Filters;
}

const GetFiltersForm: React.FC<CustomInputProps> = ({ initialFilters }) => {
  const router = useRouter();

  const { register, handleSubmit, control, formState, watch } =
    useForm<SearchFormFields>({
      resolver: zodResolver(searchFormSchema),
      defaultValues: {
        genres:
          initialFilters.genres.length > 0
            ? initialFilters.genres
            : ["All Genres"],
        bandTypes:
          initialFilters.bandTypes.length > 0
            ? initialFilters.bandTypes
            : ["All Types"],
        maxDistance:
          initialFilters.maxDistance === ""
            ? "35 mi"
            : initialFilters.maxDistance,
        dateRange:
          initialFilters.dateRange === ""
            ? "Next 30 Days"
            : initialFilters.dateRange,
      },
    });

  return (
    <Stack
      direction="column"
      spacing={2.2}
      alignItems="center"
      component="form"
      onSubmit={handleSubmit((data) => {
        const url =
          `/find/${data.location.description}/${data.maxDistance}/${data.dateRange}/${data.genres}/${data.bandTypes}`.replaceAll(
            " ",
            "%20"
          );
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
        <Picklist
          id="date-range-filter"
          label="When?"
          error={false}
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
          control={control}
          rhfName="dateRange"
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
              label="Your Location (town, city, or zip)"
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
