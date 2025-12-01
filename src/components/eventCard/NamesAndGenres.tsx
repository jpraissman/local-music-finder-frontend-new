import { Box, Chip, Stack, Typography } from "@mui/material";
// import SocialMediaIcons from "./SocialMediaIcons";
import Link from "next/link";
import { EventDTO } from "@/dto/event/Event.dto";
import { GenreLabels } from "@/newTypes/Genre";

export default function NamesAndGenres({ event }: { event: EventDTO }) {
  return (
    <Stack direction="column" sx={{ width: "50%" }}>
      <Link
        href={`/venue/${event.venue.id}`}
        style={{ textDecoration: "none", color: "black" }}
        prefetch={false}
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
          {event.venue.venueName}
        </Typography>
      </Link>
      <Link
        href={`/band/${event.band.id}`}
        style={{ textDecoration: "none", color: "black" }}
        prefetch={false}
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
          {`Band: ${event.band.bandName}`}
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
        {event.band.genres.map((genre) => (
          <Chip
            key={GenreLabels[genre]}
            label={GenreLabels[genre]}
            size="small"
            sx={{
              backgroundColor: "secondary.light",
              color: "black",
            }}
          />
        ))}
      </Box>
      {/* <Box sx={{ paddingTop: "20px" }}>
        <SocialMediaIcons event={event} />
      </Box> */}
      {event.additionalInfo && (
        <Box sx={{ paddingTop: "20px", display: { xs: "none", sm: "flex" } }}>
          <Typography color="gray" variant="body1">
            {event.additionalInfo}
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
