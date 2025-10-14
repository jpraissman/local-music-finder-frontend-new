import { Box, Button, Stack, Typography } from "@mui/material";
import {
  AttachMoney,
  CalendarMonth,
  LocationOn,
  MusicNote,
} from "@mui/icons-material";
import { EventDTO } from "@/dto/event/Event.dto";

export default function OtherEventDetails({ event }: { event: EventDTO }) {
  return (
    <Stack direction="column" spacing={1.2} sx={{ width: "50%" }}>
      <Stack direction="row" spacing={0.7}>
        <CalendarMonth sx={{ color: "secondary.main", mr: 1, fontSize: 20 }} />
        <Typography variant="body1">
          {event.eventDate.format("d, MMM D") +
            " @ " +
            event.startTime.format("h:mm A")}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.7}>
        <LocationOn sx={{ color: "secondary.main", mr: 1, fontSize: 20 }} />
        <Typography variant="body1">
          {!event.distanceInMiles
            ? event.venue.town
            : event.venue.town + `(${event.distanceInMiles} mi)`}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.7}>
        <MusicNote sx={{ color: "secondary.main", mr: 1, fontSize: 20 }} />
        {event.band.bandType !== "TRIBUTE_BAND" && (
          <Typography variant="body1">{event.band.bandType}</Typography>
        )}
        {event.band.bandType === "TRIBUTE_BAND" && (
          <Typography variant="body1">
            {event.band.bandType + " - " + event.band.tributeBandName}
          </Typography>
        )}
      </Stack>
      {event.coverCharge !== 0.01 && (
        <Stack direction="row" spacing={0.7}>
          <AttachMoney sx={{ color: "secondary.main", mr: 1, fontSize: 20 }} />
          <Typography variant="body1">
            {event.coverCharge == 0
              ? "Free Admission"
              : "$" + event.coverCharge + " cover"}
          </Typography>
        </Stack>
      )}
      <Box sx={{ paddingTop: "40px", width: "100%" }}>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          component="a"
          href={
            "https://www.google.com/maps/search/?api=1&query=" +
            event.venue.address
          }
          target="_blank"
          rel="noopener noreferrer"
          sx={{ borderRadius: "10px", fontWeight: "bold" }}
          fullWidth
        >
          Get Directions
        </Button>
      </Box>
      <Box sx={{ paddingTop: { xs: "5px", md: "10px" }, width: "100%" }}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          component="a"
          href={`/venue/${event.venue.id}`}
          sx={{ borderRadius: "10px", fontWeight: "bold" }}
          fullWidth
        >
          View Venue
        </Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          component="a"
          href={`/band/${event.band.id}`}
          sx={{ borderRadius: "10px", fontWeight: "bold" }}
          fullWidth
        >
          View Band
        </Button>
      </Box>
    </Stack>
  );
}
