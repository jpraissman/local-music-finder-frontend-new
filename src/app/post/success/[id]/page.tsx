import { CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: "20px",
      }}
    >
      <Stack
        sx={{
          width: { xs: "90%", sm: "80%", md: "75%" },
          paddingTop: "20px",
          textAlign: "center",
        }}
        direction="column"
        spacing={1}
        alignItems="center"
      >
        <CheckCircleOutline color="success" sx={{ fontSize: "100px" }} />
        <Typography
          sx={{
            fontSize: { xs: "18px", sm: "22px" },
            paddingTop: "20px",
          }}
        >
          Thanks for creating an event with The Local Music Finder!
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "24px", sm: "32px" },
            paddingTop: "40px",
          }}
        >
          Your Event ID:
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "32px", sm: "42px" },
            fontWeight: "bold",
          }}
        >
          {params.id}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "16px", sm: "22px" },
            paddingTop: "40px",
            paddingBottom: "50px",
          }}
        >
          This Event ID should be used to edit or delete your event. You will
          receive an email shortly containing this Event ID. If you do not see
          this email in a few minutes, check your junk or spam folders and add{" "}
          <strong>info@thelocalmusicfinder.com</strong> to your safe senders
          list. We recommend saving this email until your event is over.
        </Typography>
        <Link href={"/post"}>
          <Button variant="outlined" size="large">
            Create Another Event
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}
