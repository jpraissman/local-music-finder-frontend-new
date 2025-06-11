"use client";

import Band from "@/types/Band";
import { Facebook, Instagram, Language, MusicNote } from "@mui/icons-material";
import {
  Box,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";

interface BandHeaderInfoProps {
  bandInfo: Band;
}

const formatLink = (link: string) => {
  if (link.startsWith("http://") || link.startsWith("https://")) {
    return link;
  } else {
    return "https://" + link;
  }
};

export default function BandHeaderInfo({ bandInfo }: BandHeaderInfoProps) {
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
            {bandInfo.name}
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            flexWrap="wrap"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Stack direction="row" spacing={1} alignItems={"center"}>
              <MusicNote color="secondary" />
              <Typography variant="h6" color="black">
                {bandInfo.band_type === "Tribute Band"
                  ? `${bandInfo.band_type} - ${bandInfo.tribute_band_name}`
                  : `${bandInfo.band_type}`}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  paddingLeft: "5px",
                }}
              >
                {bandInfo.genres.map((genre) => (
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
            </Stack>
            {bandInfo.facebook_url && (
              <Link
                href={formatLink(bandInfo.facebook_url)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Facebook sx={{ color: "rgb(24, 119, 242)" }} />
              </Link>
            )}
            {bandInfo.instagram_url && (
              <Link
                href={formatLink(bandInfo.instagram_url)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Instagram sx={{ color: "purple" }} />
              </Link>
            )}
            {bandInfo.website_url && (
              <Link
                href={formatLink(bandInfo.website_url)}
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
          <Stack
            direction={"column"}
            sx={{ display: "flex", alignItems: "center" }}
            spacing={1}
          >
            <Typography variant="h4" color="black" fontWeight="bold">
              {bandInfo.name}
            </Typography>
            <Stack direction="row" spacing={0.2} alignItems={"center"}>
              <MusicNote color="secondary" />
              <Typography variant="body1" color="black">
                {bandInfo.band_type === "Tribute Band"
                  ? `${bandInfo.band_type} - ${bandInfo.tribute_band_name}`
                  : `${bandInfo.band_type}`}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "center",
              width: "100%",
              alignItems: "end",
            }}
            spacing={4}
          >
            <Stack
              direction={"column"}
              spacing={1}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  paddingLeft: "5px",
                }}
              >
                {bandInfo.genres.map((genre) => (
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
              <Typography variant="body1" fontWeight={"bold"}>
                Genres
              </Typography>
            </Stack>
            {bandInfo.facebook_url && (
              <Link
                href={formatLink(bandInfo.facebook_url)}
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
            {bandInfo.instagram_url && (
              <Link
                href={formatLink(bandInfo.instagram_url)}
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
            {bandInfo.website_url && (
              <Link
                href={formatLink(bandInfo.website_url)}
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
