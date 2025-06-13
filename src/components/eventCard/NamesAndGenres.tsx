import { Box, Chip, Stack, Typography } from "@mui/material";
import SocialMediaIcons from "./SocialMediaIcons";
import Event from "@/types/Event";
import Link from "next/link";

export default function NamesAndGenres({ event }: { event: Event }) {
  return (
    <Stack direction="column" sx={{ width: "50%" }}>
      <Link
        href={`/venue/${event.venue_id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 400,
            "&:hover": {
              fontWeight: 600,
              cursor: "pointer",
            },
          }}
        >
          {event.venue_name}
        </Typography>
      </Link>
      <Link
        href={`/band/${event.band_id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Typography
          variant="h6"
          color="gray"
          sx={{
            fontWeight: 400,
            "&:hover": {
              fontWeight: 600,
              cursor: "pointer",
            },
          }}
        >
          {`Band: ${event.band_name}`}
        </Typography>
      </Link>
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
      {event.other_info !== "" && (
        <Box sx={{ paddingTop: "20px", display: { xs: "none", sm: "flex" } }}>
          <Typography color="gray" variant="body1">
            {event.other_info}
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
