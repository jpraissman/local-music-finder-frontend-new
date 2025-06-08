import Venue from "@/types/Venue";
import {
  Facebook,
  Instagram,
  Language,
  Launch,
  LocationOn,
  Phone,
} from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";

interface VenueInfoProps {
  venueInfo: Venue;
}

const formatLink = (link: string) => {
  if (link.startsWith("https://www.")) {
    return link.replace("https://www.", "");
  } else if (link.startsWith("https://")) {
    return link.replace("https://", "");
  } else if (link.startsWith("www.")) {
    return link.replace("www.", "");
  } else if (link.startsWith("http://")) {
    return link.replace("http://", "");
  } else if (link.startsWith("http://www.")) {
    return link.replace("http://www.", "");
  } else {
    return link;
  }
};

export default function VenueInfo({ venueInfo }: VenueInfoProps) {
  return (
    <Box
      sx={{
        width: "100%",
        background:
          "linear-gradient(135deg,rgb(50, 55, 65) 0%, #2a5298 50%,rgb(104, 150, 235) 100%)",
      }}
    >
      <Stack
        direction="column"
        spacing={3}
        sx={{
          textAlign: "center",
          alignItems: "center",
          padding: "50px",
        }}
      >
        <Typography variant="h2" color="white" fontWeight="bold">
          {venueInfo.name}
        </Typography>
        <Stack
          direction="row"
          spacing={3}
          flexWrap="wrap"
          justifyContent={"center"}
        >
          <Link
            href={
              "https://www.google.com/maps/search/?api=1&query=" +
              venueInfo.address
            }
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOn color="secondary" />
              <Typography variant="h6" color="white">
                {venueInfo.address}
              </Typography>
              <Launch sx={{ color: "white", fontSize: "20px" }} />
            </Stack>
          </Link>
          {venueInfo.phone_number && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Phone color="secondary" />
              <Typography variant="h6" color="white">
                {venueInfo.phone_number}
              </Typography>
            </Stack>
          )}
          {venueInfo.facebook_link && (
            <Link
              href={venueInfo.facebook_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Facebook color="secondary" />
                <Typography variant="h6" color="white">
                  {formatLink(venueInfo.facebook_link)}
                </Typography>
                <Launch sx={{ color: "white", fontSize: "20px" }} />
              </Stack>
            </Link>
          )}
          {venueInfo.instagram_link && (
            <Link
              href={venueInfo.instagram_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Instagram color="secondary" />
                <Typography variant="h6" color="white">
                  {formatLink(venueInfo.instagram_link)}
                </Typography>
                <Launch sx={{ color: "white", fontSize: "20px" }} />
              </Stack>
            </Link>
          )}
          {venueInfo.website && (
            <Link
              href={venueInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Language color="secondary" />
                <Typography variant="h6" color="white">
                  {formatLink(venueInfo.website)}
                </Typography>
                <Launch sx={{ color: "white", fontSize: "20px" }} />
              </Stack>
            </Link>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
