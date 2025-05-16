import { MusicNote, Event } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

interface LandingPageCardProps {
  type: "POST" | "DISCOVER";
}

export default function LandingPageCard({ type }: LandingPageCardProps) {
  return (
    <Card
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 20px rgba(0,0,0,0.12)",
        },
        backgroundColor: "rgba(244, 241, 241, 0.98)",
        maxWidth: "550px",
      }}
      elevation={2}
    >
      <CardContent sx={{ textAlign: "center" }}>
        {type === "POST" && (
          <MusicNote sx={{ fontSize: 60, color: "secondary.main", mb: 2 }} />
        )}
        {type === "DISCOVER" && (
          <Event sx={{ fontSize: 60, color: "secondary.main", mb: 2 }} />
        )}
        <Typography gutterBottom variant="h4">
          {type === "POST" ? "Post Your Event" : "Discover Local Music"}
        </Typography>
        <Typography gutterBottom>
          {type === "POST"
            ? "Any venue, bar, band, performer (or anyone really!) can post their live music events to have them easily be discovered."
            : "Quickly search for live music events by location, date, genre, and more. Finding local music in your area has never been easier!"}
        </Typography>
        <Box sx={{ paddingTop: "15px" }}>
          {type === "POST" && (
            <Link href="/post">
              <Button
                variant="contained"
                size="large"
                sx={{ minWidth: "200px" }}
              >
                Post An Event
              </Button>
            </Link>
          )}
          {type === "DISCOVER" && (
            <Link href="/find">
              <Button
                variant="contained"
                size="large"
                sx={{ minWidth: "200px" }}
              >
                Find Local Music
              </Button>
            </Link>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
