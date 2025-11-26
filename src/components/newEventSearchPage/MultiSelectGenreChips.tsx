import { useFiltersContext } from "@/context/FiltersContext";
import { Genre, GenreLabels } from "@/newTypes/Genre";
import { Button, Chip, Stack } from "@mui/material";

interface MultiSelectGenreChipsProps {
  canEdit: () => boolean;
}

export default function MultiSelectGenreChips({
  canEdit,
}: MultiSelectGenreChipsProps) {
  const { filters, setFilters } = useFiltersContext();

  return (
    <Stack display={"flex"} alignItems={"center"} spacing={2}>
      <Stack direction={"row"} useFlexGap flexWrap={"wrap"} spacing={1}>
        {Object.values(Genre).map((genre) => (
          <Chip
            key={GenreLabels[genre]}
            label={GenreLabels[genre]}
            size="small"
            clickable
            onClick={() => {
              if (canEdit()) {
                if (filters.genres.includes(genre)) {
                  const newGenres = filters.genres.filter(
                    (selectedGenre) => selectedGenre !== genre
                  );
                  setFilters((prev) => ({ ...prev, genres: newGenres }));
                } else {
                  const newGenres = [...filters.genres, genre];
                  setFilters((prev) => ({ ...prev, genres: newGenres }));
                }
              }
            }}
            variant={filters.genres.includes(genre) ? "filled" : "outlined"}
            sx={{
              backgroundColor: filters.genres.includes(genre)
                ? "secondary.main"
                : "transparent",
              "&:hover": {
                backgroundColor: filters.genres.includes(genre)
                  ? "secondary.dark"
                  : "secondary.light",
              },
            }}
          />
        ))}
      </Stack>
      {filters.genres.length > 0 && (
        <Button
          variant="contained"
          color="secondary"
          sx={{ maxWidth: "200px" }}
          onClick={() => setFilters((prev) => ({ ...prev, genres: [] }))}
        >
          Reset
        </Button>
      )}
    </Stack>
  );
}
