"use client";

import Venue from "@/types/Venue";
import {
  Directions,
  Facebook,
  Instagram,
  Language,
  Launch,
  LocationOn,
  Phone,
} from "@mui/icons-material";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";

interface VenueHeaderInfoProps {
  venueInfo: Venue;
}

const formatLink = (link: string) => {
  if (link.startsWith("http://") || link.startsWith("https://")) {
    return link;
  } else {
    return "https://" + link;
  }
};

export default function VenueHeaderInfo({ venueInfo }: VenueHeaderInfoProps) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        width: "100%",
        background:
          "linear-gradient(135deg,rgba(255, 252, 252, 0.98), rgba(230, 226, 226, 0.98), rgba(199, 199, 199, 0.98))",
      }}
    >
      {isMdUp && (
        <Stack
          direction="column"
          spacing={3}
          sx={{
            textAlign: "center",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <Typography variant="h2" color="black" fontWeight="bold">
            {venueInfo.name}
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            flexWrap="wrap"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Link
              href={
                "https://www.google.com/maps/search/?api=1&query=" +
                venueInfo.address
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOn color="secondary" />
                <Typography variant="h6" color="black">
                  {venueInfo.address}
                </Typography>
                <Launch sx={{ color: "black", fontSize: "20px" }} />
              </Stack>
            </Link>
            {venueInfo.phone_number && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Phone color="secondary" />
                <Typography variant="h6" color="black">
                  {venueInfo.phone_number}
                </Typography>
              </Stack>
            )}
            {venueInfo.facebook_link && (
              <Link
                href={formatLink(venueInfo.facebook_link)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Facebook sx={{ color: "rgb(24, 119, 242)" }} />
              </Link>
            )}
            {venueInfo.instagram_link && (
              <Link
                href={formatLink(venueInfo.instagram_link)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Instagram sx={{ color: "purple" }} />
              </Link>
            )}
            {venueInfo.website && (
              <Link
                href={formatLink(venueInfo.website)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Language sx={{ color: "black" }} />
              </Link>
            )}
          </Stack>
        </Stack>
      )}
      {!isMdUp && (
        <Stack
          direction={"column"}
          spacing={3}
          sx={{
            textAlign: "center",
            alignItems: "center",
            paddingTop: "30px",
            paddingBottom: "20px",
            paddingX: "10px",
          }}
        >
          <Typography variant="h4" color="black" fontWeight="bold">
            {venueInfo.name}
          </Typography>
          <Stack
            direction={"row"}
            sx={{ justifyContent: "center", width: "100%" }}
            spacing={4}
          >
            <Link
              href={
                "https://www.google.com/maps/search/?api=1&query=" +
                venueInfo.address
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Stack
                direction={"column"}
                spacing={1}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Directions
                  sx={{ fontSize: "50px", color: "secondary.main" }}
                />
                <Typography variant="body1" fontWeight={"bold"}>
                  Directions
                </Typography>
              </Stack>
            </Link>
            {venueInfo.facebook_link && (
              <Link
                href={formatLink(venueInfo.facebook_link)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Stack
                  direction={"column"}
                  spacing={1}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Facebook
                    sx={{ fontSize: "50px", color: "rgb(24, 119, 242)" }}
                  />
                  <Typography variant="body1" fontWeight={"bold"}>
                    Facebook
                  </Typography>
                </Stack>
              </Link>
            )}
            {venueInfo.instagram_link && (
              <Link
                href={formatLink(venueInfo.instagram_link)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Stack
                  direction={"column"}
                  spacing={1}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Instagram sx={{ fontSize: "50px", color: "purple" }} />
                  <Typography variant="body1" fontWeight={"bold"}>
                    Instagram
                  </Typography>
                </Stack>
              </Link>
            )}
            {venueInfo.website && (
              <Link
                href={formatLink(venueInfo.website)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Stack
                  direction={"column"}
                  spacing={1}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Language sx={{ fontSize: "50px", color: "black" }} />
                  <Typography variant="body1" fontWeight={"bold"}>
                    Website
                  </Typography>
                </Stack>
              </Link>
            )}
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
