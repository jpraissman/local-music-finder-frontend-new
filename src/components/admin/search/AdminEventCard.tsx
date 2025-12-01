"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { AdminEventDTO } from "@/dto/event/AdminEvent.dto";
import dayjs from "dayjs";
import { GenreLabels } from "@/newTypes/Genre";
import { BandTypeLabels } from "@/newTypes/BandType";
import { useRouter } from "next/navigation";
import { deleteEvent } from "@/api/apiCalls";

interface AdminEventCardProps {
  event: AdminEventDTO;
  onDelete: () => void;
}

export default function AdminEventCard({
  event,
  onDelete,
}: AdminEventCardProps) {
  const router = useRouter();

  return (
    <Card
      sx={{
        width: "100%",
        height: "fit-content",
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: "text.secondary", mb: 0.5 }}
        >
          {dayjs(event.eventDate).format("ddd, MMM D") +
            " @ " +
            dayjs(`2000-01-01 ${event.startTime}`).format("h:mm A")}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1.5 }}>
          <MusicNoteIcon sx={{ fontSize: 18, flexShrink: 0 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              {event.band.bandName}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {BandTypeLabels[event.band.bandType]}
            </Typography>
          </Box>
        </Box>
        {event.band.genres.length > 0 && (
          <Box sx={{ display: "flex", gap: 0.5, mb: 1.5, flexWrap: "wrap" }}>
            {event.band.genres.map((genre) => (
              <Chip
                key={genre}
                label={GenreLabels[genre]}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1.5 }}>
          <LocationOnIcon sx={{ fontSize: 18, flexShrink: 0 }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {event.venue.venueName}
            </Typography>
            {event.venue.town && (
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {event.venue.town}
              </Typography>
            )}
          </Box>
        </Box>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
          Cover:{" "}
          <span style={{ fontWeight: 500 }}>
            ${event.coverCharge.toFixed(2)}
          </span>
        </Typography>

        {event.additionalInfo && (
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", display: "block" }}
          >
            {event.additionalInfo}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", pt: 0, pb: 1 }}>
        <IconButton
          size="small"
          onClick={() => router.push(`/edit/${event.eventCode}`)}
          color="primary"
          aria-label="edit event"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={async () => {
            await deleteEvent(event.eventCode);
            onDelete();
          }}
          color="error"
          aria-label="delete event"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
