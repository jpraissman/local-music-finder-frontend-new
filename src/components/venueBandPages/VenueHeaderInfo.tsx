import Venue from "@/types/Venue";
import { Directions, Facebook, Instagram, Language } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
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
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url(/saxophone.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 1,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 2,
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 3,
        }}
      >
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
          <Typography
            color="white"
            fontWeight="bold"
            sx={{ fontSize: { xs: "35px", md: "55px" } }}
          >
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
              style={{ textDecoration: "none", color: "white" }}
            >
              <Stack
                direction={"column"}
                spacing={1}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Directions
                  sx={{
                    fontSize: { xs: "50px", md: "70px" },
                    color: "secondary.main",
                  }}
                />
                <Typography
                  sx={{ fontSize: { xs: "18px", md: "20px" } }}
                  fontWeight={"bold"}
                >
                  Directions
                </Typography>
              </Stack>
            </Link>
            {venueInfo.facebook_link && (
              <Link
                href={formatLink(venueInfo.facebook_link)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Stack
                  direction={"column"}
                  spacing={1}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Facebook
                    sx={{
                      fontSize: { xs: "50px", md: "70px" },
                      color: "rgb(24, 119, 242)",
                    }}
                  />
                  <Typography
                    sx={{ fontSize: { xs: "18px", md: "20px" } }}
                    fontWeight={"bold"}
                  >
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
                style={{ textDecoration: "none", color: "white" }}
              >
                <Stack
                  direction={"column"}
                  spacing={1}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Instagram
                    sx={{
                      fontSize: { xs: "50px", md: "70px" },
                      color: "#b9a0e8",
                    }}
                  />
                  <Typography
                    sx={{ fontSize: { xs: "18px", md: "20px" } }}
                    fontWeight={"bold"}
                  >
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
                style={{ textDecoration: "none", color: "white" }}
              >
                <Stack
                  direction={"column"}
                  spacing={1}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Language
                    sx={{
                      fontSize: { xs: "50px", md: "70px" },
                      color: "white",
                    }}
                  />
                  <Typography
                    sx={{ fontSize: { xs: "18px", md: "20px" } }}
                    fontWeight={"bold"}
                  >
                    Website
                  </Typography>
                </Stack>
              </Link>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
