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
            promote and discover local music. Posting and finding events is not
            only easy, but it’s also always up-to-date, saving everyone valuable
            time. (Check out our <Link href={"/faqs"}>FAQs</Link> for
            step-by-step instructions on posting and finding events). <br />
            <br />
            As our community grows, TheLocalMusicFinder.com remains completely
            free for everyone to use. All we ask is that you post events, search
            for events, and help spread the word about TheLocalMusicFinder.com.{" "}
            <br />
            <br />
            Thanks for your support! <br />
            Your friends at “TheLocalMusicFinder.com”
          </Typography>
        </Box>
      </Stack>
    </>
  );
}
