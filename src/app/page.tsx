import { Create, Search } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Local Music Finder",
  description:
    "Find live music events in North Jersey. Easily post your live music events to reach many people.",
};

export default function Home() {
  return (
    <Box
      sx={{
        textAlign: "center",
        paddingTop: "20px",
      }}
    >
      <Stack direction="column" spacing={2}>
        <Typography
          sx={{ fontSize: { xs: "25px", sm: "30px" }, fontWeight: "bold" }}
        >
          Welcome to TheLocalMusicFinder.com!
        </Typography>
        <Typography sx={{ fontSize: { xs: "16px", sm: "25px" } }}>
          A community where venues, musicians, and music fans come together to
          find and share local live music.
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              minHeight: { xs: "20vh", md: "50vh" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link href="/find">
              <Button
                endIcon={<Search />}
                size="large"
                sx={{ fontSize: "30px", fontWeight: "bold" }}
              >
                Find Live Music
              </Button>
            </Link>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              minHeight: { xs: "10vh", md: "50vh" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link href="/post">
              <Button
                color="success"
                endIcon={<Create />}
                size="large"
                sx={{ fontSize: "30px", fontWeight: "bold" }}
              >
                Post An Event
              </Button>
            </Link>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
