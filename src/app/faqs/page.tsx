import { Box, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQs - The Local Music Finder",
  description:
    "Here are some frequently asked questions to help you use The Local Music Finder more effectively.",
};

export default function Page() {
  return (
    <>
      <Stack
        direction="column"
        spacing={4}
        sx={{
          textAlign: "center",
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
            p: 4,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "35px",
            }}
          >
            FAQs
          </Typography>
          <Stack direction="column" spacing={4} sx={{ textAlign: "left" }}>
            <Stack direction="column" spacing={1}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "17px", md: "20px" },
                }}
              >
                How do you post an event?
              </Typography>
              <Link href="/post">
                <Typography
                  sx={{
                    fontSize: { xs: "16px", md: "18px" },
                    paddingLeft: "10px",
                  }}
                >
                  Click here to post an event.
                </Typography>
              </Link>
            </Stack>
            <Stack direction="column" spacing={1}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "17px", md: "20px" },
                }}
              >
                How do I modify or delete an event that I posted?
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  paddingLeft: "10px",
                }}
              >
                Once you post an event, you will receive an email from
                <strong> info@thelocalmusicfinder.com</strong>. In this email
                there will be an Event ID. This ID will allow you to modify or
                delete your event.{" "}
                <Link href="/edit">
                  To modify or delete an event, please click here.
                </Link>{" "}
                Please note for each event posted, you will receive a separate
                email with a unique Event ID. Please save these emails until the
                specific event has ended.
              </Typography>
            </Stack>
            <Stack direction="column" spacing={1}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "17px", md: "20px" },
                }}
              >
                How much does it cost to post an event?
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  paddingLeft: "10px",
                }}
              >
                As we grow this community, posting events to
                TheLocalMusicFinder.com will be free. If and when we decide to
                charge for any services on the site, you will be notified at
                least 60 days in advance. We anticipate that if and when we
                start to charge for any services, there will always be certain
                services that remain free.
              </Typography>
            </Stack>
            <Stack direction="column" spacing={1}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "17px", md: "20px" },
                }}
              >
                How do you search for events?
              </Typography>
              <Link href="/find">
                <Typography
                  sx={{
                    fontSize: { xs: "16px", md: "18px" },
                    paddingLeft: "10px",
                  }}
                >
                  Click here to search for an event.
                </Typography>
              </Link>
            </Stack>
            <Stack direction="column" spacing={1.5}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "17px", md: "20px" },
                }}
              >
                How can you help us grow this community?
              </Typography>
              <Typography
                sx={{
                  fontStyle: "italic",
                  fontSize: { xs: "16px", md: "18px" },
                  paddingLeft: "10px",
                }}
              >
                If you are a band or venue:
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  paddingLeft: "20px",
                }}
              >
                1. Post all your upcoming events for free by{" "}
                <Link href="/post">clicking here</Link>.
                <br /> 2. Tell your customers, fans, and friends about us.{" "}
                <br />
                3. Post <strong>https://www.thelocalmusicfinder.com </strong>
                on your website and social media accounts. Having more people
                coming to our site benefits you, your fans/customers, and
                TheLocalMusicFinder.com.
              </Typography>
              <Typography
                sx={{
                  fontStyle: "italic",
                  fontSize: { xs: "16px", md: "18px" },
                  paddingLeft: "10px",
                }}
              >
                If you are a music fan:
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  paddingLeft: "20px",
                }}
              >
                1. Come back to the site at least once a week to check out new
                live music events.
                <br /> 2. Tell the Band or Venue that you saw their event on
                TheLocalMusicFinder.com
                <br />
                3. Tell your friends looking to see local live music to check
                out TheLocalMusicFinder.com, and if you wouldn’t mind posting a
                link to our site on your social media accounts, that would be a
                huge help to us.
              </Typography>
            </Stack>
            <Stack direction="column" spacing={1}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "17px", md: "20px" },
                }}
              >
                Why do I see duplicate postings for the same event?
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  paddingLeft: "10px",
                }}
              >
                TheLocalMusicFinder.com allows both bands and venues to post
                events. Even though they may post the same event, there could be
                slightly different information provided by each, so we leave
                both up to give you the most information possible.
              </Typography>
            </Stack>
            <Stack direction="column" spacing={1}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "17px", md: "20px" },
                }}
              >
                Have any other questions?
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  paddingLeft: "10px",
                }}
              >
                Feel free to contact us at{" "}
                <a href="mailto:questions@thelocalmusicfinder.com">
                  questions@thelocalmusicfinder.com
                </a>
                .
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
