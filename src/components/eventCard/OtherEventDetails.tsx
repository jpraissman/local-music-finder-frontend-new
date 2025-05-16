import { Box, Button, Stack, Typography } from "@mui/material";
import {
  AttachMoney,
  CalendarMonth,
  LocationOn,
  MusicNote,
} from "@mui/icons-material";
import Event from "@/types/Event";

export default function OtherEventDetails({ event }: { event: Event }) {
  return (
    <Stack direction="column" spacing={1.2} sx={{ width: "50%" }}>
      <Stack direction="row" spacing={0.7}>
        <CalendarMonth sx={{ color: "secondary.main", mr: 1, fontSize: 20 }} />
        <Typography variant="body1">
          {event.date_formatted + " @ " + event.start_time_formatted}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.7}>
        <LocationOn sx={{ color: "secondary.main", mr: 1, fontSize: 20 }} />
        <Typography variant="body1">
          {event.distance_formatted === ""
            ? event.town
            : event.town + " (" + event.distance_formatted + ")"}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.7}>
        <MusicNote sx={{ color: "secondary.main", mr: 1, fontSize: 20 }} />
        {event.band_type !== "Tribute Band" && (
          <Typography variant="body1">{event.band_type}</Typography>
        )}
        {event.band_type === "Tribute Band" && (
          <Typography variant="body1">
            {event.band_type + " - " + event.tribute_band_name}
          </Typography>
        )}
      </Stack>
      {event.cover_charge !== 0.01 && (
        <Stack direction="row" spacing={0.7}>
          <AttachMoney sx={{ color: "secondary.main", mr: 1, fontSize: 20 }} />
          <Typography variant="body1">
            {event.cover_charge == 0
              ? "Free Admission"
              : "$" + event.cover_charge + " cover"}
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
            "https://www.google.com/maps/search/?api=1&query=" + event.address
          }
          target="_blank"
          rel="noopener noreferrer"
          sx={{ borderRadius: "10px", fontWeight: "bold" }}
          fullWidth
        >
          Get Directions
        </Button>
      </Box>
    </Stack>
  );
}
