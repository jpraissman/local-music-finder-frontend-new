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
          sx={{ fontSize: { xs: "25px", sm: "50px" }, fontWeight: "bold" }}
        >
          Welcome to TheLocalMusicFinder.com!
        </Typography>
        <Typography sx={{ fontSize: { xs: "16px", sm: "30px" } }}>
          A community where venues, musicians, and music fans come together to
          find and share local live music.
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              paddingTop: "50px",
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
                variant="contained"
              >
                Find Live Music
              </Button>
            </Link>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              paddingTop: "50px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link href="/post">
              <Button
                color="success"
                variant="contained"
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
      <Stack
        direction="column"
        spacing={4}
        sx={{
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          paddingTop: "150px",
        }}
      >
        <Box
          sx={{
            width: { xs: "90vw", md: "70vw", xl: "50vw" },
            backgroundColor: "whitesmoke",
            p: 2,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: { xs: "22px", sm: "26px", md: "35px" },
                fontWeight: "bold",
              }}
            >
              What is TheLocalMusicFinder.com?
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "18px", paddingTop: "20px" }}>
            We’re big music fans and enjoy nothing more than seeing a live band
            near where we live. But finding whose playing can be not only
            challenging and frustrating but also takes way too much time out of
            everyone’s busy life. We can spend hours looking online but more
            often than not, don’t find anywhere to go and see live music which
            doesn’t help venues, musicians, or fans. <br />
            <br />
            And then it hit us – why not create a website that solves this
            problem by offering a convenient way to find live music near us
            which is how “TheLocalMusicFinder.com.” was born. <br /> <br />
            We are building an online community where venue owners/managers,
            musicians, and music fans can easily connect to promote and find
            local music. Posting events and finding them is not only simple, it
            is always up to date and will save everyone a great deal of time
            (See <Link href="/faqs">FAQs</Link> for instructions on both posting
            and finding events). <br />
            <br />
            As we grow this community, the TheLocalMusicFinder.com is entirely
            free for everyone. All we ask is that you post events, look for
            events, and tell everyone you know about TheLocalMusicFinder.com.{" "}
            <br />
            <br />
            Thanks for your support, <br />
            Your friends at “TheLocalMusicFinder.com”
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
