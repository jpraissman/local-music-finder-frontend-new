"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Event from "../types/Event";
import {
  AccessTime,
  CalendarMonth,
  Clear,
  Facebook,
  Group,
  Home,
  Instagram,
  MonetizationOn,
  MusicNote,
  Phone,
  Place,
} from "@mui/icons-material";
import { useState } from "react";
import Link from "next/link";

interface CustomInputProps {
  event: Event;
}

const EventCard: React.FC<CustomInputProps> = ({ event }) => {
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);

  return (
    <div>
      <Card
        elevation={3}
        sx={{
          maxWidth: "800px",
          width: "95vw",
        }}
      >
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <CardHeader title={event.band_name + " @ " + event.venue_name} />
        </Box>
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <CardHeader
            title={event.venue_name}
            subheader={"Band/Performer: " + event.band_name}
          />
        </Box>
        <CardContent>
          <Stack spacing={2.5} direction="column">
            <Stack spacing={2} direction="row">
              <Stack spacing={0.5} direction="row">
                <Tooltip title="Date of Event">
                  <CalendarMonth color="primary" sx={{ fontSize: "21px" }} />
                </Tooltip>
                <Typography color="textPrimary" sx={{ fontSize: "16px" }}>
                  {event.date_formatted}
                </Typography>
              </Stack>
              <Stack spacing={0.5} direction="row">
                <Tooltip title="Time of Event">
                  <AccessTime color="primary" sx={{ fontSize: "21px" }} />
                </Tooltip>
                <Typography color="textPrimary" sx={{ fontSize: "16px" }}>
                  {event.end_time === null
                    ? event.start_time_formatted
                    : event.start_time_formatted + " - " + event.end_time}
                </Typography>
              </Stack>
              <Stack
                spacing={0.5}
                direction="row"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <Tooltip title="Cover Charge">
                  <MonetizationOn color="primary" sx={{ fontSize: "21px" }} />
                </Tooltip>
                {event.cover_charge === 0 ? (
                  <Typography color="textPrimary" sx={{ fontSize: "16px" }}>
                    Free Admission
                  </Typography>
                ) : event.cover_charge === 0.01 ? (
                  <Typography color="textPrimary" sx={{ fontSize: "16px" }}>
                    Cover Charge Not Specified
                  </Typography>
                ) : (
                  <Typography color="textPrimary" sx={{ fontSize: "16px" }}>
                    {"$" + event.cover_charge + " cover charge"}
                  </Typography>
                )}
              </Stack>
            </Stack>
            <Stack spacing={2} direction="row">
              <Stack spacing={0.5} direction="row">
                <Tooltip title="Venue Address">
                  <Home color="secondary" sx={{ fontSize: "21px" }} />
                </Tooltip>
                <Typography color="textPrimary" sx={{ fontSize: "16px" }}>
                  {event.address}
                </Typography>
              </Stack>
              {event.distance_value != -1 && (
                <Stack
                  spacing={0.5}
                  direction="row"
                  sx={{ display: { xs: "none", sm: "flex" } }}
                >
                  <Tooltip title="Distance">
                    <Place color="secondary" sx={{ fontSize: "21px" }} />
                  </Tooltip>
                  <Typography color="textPrimary" sx={{ fontSize: "16px" }}>
                    {event.distance_formatted}
                  </Typography>
                </Stack>
              )}
            </Stack>
            <Stack
              spacing={2}
              direction="row"
              sx={{ display: { xs: "flex", sm: "none" } }}
            >
              {event.distance_value != -1 && (
                <Stack spacing={0.5} direction="row">
                  <Tooltip title="Distance">
                    <Place color="secondary" sx={{ fontSize: "21px" }} />
                  </Tooltip>
                  <Typography color="textPrimary" sx={{ fontSize: "16px" }}>
                    {event.distance_formatted}
                  </Typography>
                </Stack>
              )}
              <Stack spacing={0.5} direction="row">
                <Tooltip title="Cover Charge">
                  <MonetizationOn color="secondary" sx={{ fontSize: "21px" }} />
                </Tooltip>
                {event.cover_charge === 0 ? (
                  <Typography color="textPrimary" sx={{ fontSize: "16px" }}>
                    Free Admission
                  </Typography>
                ) : event.cover_charge === 0.01 ? (
                  <Typography color="textPrimary" sx={{ fontSize: "16px" }}>
                    Cover Charge Not Specified
                  </Typography>
                ) : (
                  <Typography color="textPrimary" sx={{ fontSize: "16px" }}>
                    {"$" + event.cover_charge + " cover charge"}
                  </Typography>
                )}
              </Stack>
            </Stack>
            <Stack spacing={2} direction="row">
              <Stack spacing={0.5} direction="row">
                <Tooltip title="Band Genre(s)">
                  <MusicNote color="action" sx={{ fontSize: "21px" }} />
                </Tooltip>
                <Typography color="textPrimary" sx={{ fontSize: "16px" }}>
                  {event.genres.join(", ")}
                </Typography>
              </Stack>
              <Stack spacing={0.5} direction="row">
                <Tooltip title="Band Type">
                  <Group color="action" sx={{ fontSize: "21px" }} />
                </Tooltip>
                <Typography color="textPrimary" sx={{ fontSize: "16px" }}>
                  {event.band_type === "Tribute Band"
                    ? event.band_type + " - " + event.tribute_band_name
                    : event.band_type}
                </Typography>
              </Stack>
              {event.phone_number !== "" && (
                <Stack
                  spacing={0.5}
                  direction="row"
                  sx={{ display: { xs: "none", sm: "flex" } }}
                >
                  <Tooltip title="Venue Phone Number">
                    <Phone color="action" sx={{ fontSize: "21px" }} />
                  </Tooltip>
                  <Box sx={{ minWidth: "120px" }}>
                    <Typography color="textPrimary" sx={{ fontSize: "16px" }}>
                      {event.phone_number}
                    </Typography>
                  </Box>
                </Stack>
              )}
            </Stack>
            {event.phone_number !== "" && (
              <Stack
                spacing={0.5}
                direction="row"
                sx={{ display: { xs: "flex", sm: "none" } }}
              >
                <Tooltip title="Venue Phone Number">
                  <Phone sx={{ fontSize: "21px" }} />
                </Tooltip>
                <Typography color="textPrimary" sx={{ fontSize: "16px" }}>
                  {event.phone_number}
                </Typography>
              </Stack>
            )}
            {event.other_info !== "" && (
              <Typography color="textSecondary" sx={{ fontSize: "16px" }}>
                {event.other_info}
              </Typography>
            )}
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            component="a"
            href={
              "https://www.google.com/maps/search/?api=1&query=" + event.address
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </Button>
          {(event.facebook_handle !== "" ||
            event.instagram_handle !== "" ||
            event.website !== "") && (
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => {
                setShowMoreInfo(true);
              }}
            >
              See Website/Socials
            </Button>
          )}
        </CardActions>
      </Card>
      <Modal
        open={showMoreInfo}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            boxShadow: 24,
            overflow: "auto",
            maxWidth: "90vw",
          }}
        >
          <Box sx={{ textAlign: "right" }}>
            <IconButton onClick={() => setShowMoreInfo(false)}>
              <Clear color="error" sx={{ fontSize: "30px" }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              paddingRight: 4,
              paddingLeft: 4,
              paddingBottom: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                border: "1px solid black",
                p: 2,
              }}
            >
              <Stack
                spacing={2}
                direction="column"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight={"bold"} fontSize={"20px"}>
                  {event.band_or_venue + " Information"}
                </Typography>
                {event.facebook_handle !== "" && (
                  <Link
                    href={
                      event.facebook_handle.startsWith("https://")
                        ? event.facebook_handle
                        : `https://${event.facebook_handle}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Stack
                      spacing={0.5}
                      direction="row"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <IconButton>
                        <Facebook color="primary" sx={{ fontSize: "21px" }} />
                      </IconButton>
                      <Typography
                        color="textPrimary"
                        sx={{ fontSize: "16px", wordBreak: "break-all" }}
                      >
                        {event.facebook_handle}
                      </Typography>
                    </Stack>
                  </Link>
                )}
                {event.instagram_handle !== "" && (
                  <Link
                    href={
                      event.instagram_handle.startsWith("https://")
                        ? event.instagram_handle
                        : `https://${event.instagram_handle}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Stack
                      spacing={0.5}
                      direction="row"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <IconButton>
                        <Instagram
                          color="secondary"
                          sx={{ fontSize: "21px" }}
                        />
                      </IconButton>
                      <Typography
                        color="textPrimary"
                        sx={{ fontSize: "16px", wordBreak: "break-all" }}
                      >
                        {event.instagram_handle}
                      </Typography>
                    </Stack>
                  </Link>
                )}
                {event.website !== "" && (
                  <Stack spacing={0.5} direction="row">
                    <Typography
                      color="textPrimary"
                      sx={{ fontSize: "16px", fontWeight: "bold" }}
                    >
                      {"Website: "}
                    </Typography>
                    <Link
                      href={
                        event.website.startsWith("http://") ||
                        event.website.startsWith("https://")
                          ? event.website
                          : `http://${event.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography
                        color="textPrimary"
                        sx={{ fontSize: "16px", wordBreak: "break-all" }}
                      >
                        {event.website}
                      </Typography>
                    </Link>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EventCard;
