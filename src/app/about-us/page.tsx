import PageVisitTracker from "@/components/PageVisitTracker";
import { Box, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - The Local Music Finder",
  description:
    "We’re  big music fans and enjoy nothing more than seeing a live band near where we live. But finding whose playing can be not only challenging and frustrating but also takes way too much time out of everyone’s busy life. We created TheLocalMusicFinder.com to fix that issue!",
};

export default function Page() {
  return (
    <>
      <PageVisitTracker page="About Us" />
      <Stack
        direction="column"
        spacing={4}
        sx={{
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          paddingTop: "50px",
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
            <Typography sx={{ fontSize: "35px", fontWeight: "bold" }}>
              About Us
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
    </>
  );
}
