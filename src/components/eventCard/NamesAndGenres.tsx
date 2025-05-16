import { Box, Chip, Stack, Typography } from "@mui/material";
import { NewEventCardProps } from "./NewEventCard";
import SocialMediaIcons from "./SocialMediaIcons";

export default function NamesAndGenres({ event }: NewEventCardProps) {
  return (
    <Stack direction="column" sx={{ width: "50%" }}>
      <Typography variant="h5">{event.venue_name}</Typography>
      <Typography variant="h6" color="gray">
        {event.band_name}
      </Typography>
      <Box sx={{ paddingTop: "10px" }}>
        <Typography variant="body1">Genres:</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          paddingTop: "5px",
        }}
      >
        {event.genres.map((genre) => (
          <Chip
            key={genre}
            label={genre}
            size="small"
            sx={{
              backgroundColor: "secondary.light",
              color: "black",
            }}
          />
        ))}
      </Box>
      <Box sx={{ paddingTop: "20px" }}>
        <SocialMediaIcons event={event} />
      </Box>
    </Stack>
  );
}
