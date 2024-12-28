import PageVisitTracker from "@/components/PageVisitTracker";
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
    <>
      <PageVisitTracker page="Home" />
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
              We’re passionate music fans who love nothing more than catching a
              live band close to home. But finding out who’s playing nearby can
              often be frustrating, time-consuming, and more effort than it’s
              worth. After spending hours searching online, we often come up
              empty-handed—leaving fans, venues, and musicians disconnected.{" "}
              <br />
              <br />
              That’s when we had an idea: why not create a website to solve this
              problem? And that’s how TheLocalMusicFinder.com was born. <br />{" "}
              <br />
              Our mission is to build an online community where venue owners,
              managers, musicians, and music fans can connect seamlessly to
              promote and discover local music. Posting and finding events is
              not only easy, but it’s also always up-to-date, saving everyone
              valuable time. (Check out our <Link href={"/faqs"}>FAQs</Link> for
              step-by-step instructions on posting and finding events). <br />
              <br />
              As our community grows, TheLocalMusicFinder.com remains completely
              free for everyone to use. All we ask is that you post events,
              search for events, and help spread the word about
              TheLocalMusicFinder.com. <br />
              <br />
              Thanks for your support! <br />
              Your friends at “TheLocalMusicFinder.com”
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
