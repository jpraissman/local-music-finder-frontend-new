import { CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, Link, Stack, Typography } from "@mui/material";

export default function Page() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          width: { xs: "90%", sm: "80%", md: "60%", lg: "50%", xl: "40%" },
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
            fontSize: { xs: "24px", sm: "32px" },
            paddingTop: "40px",
            paddingBottom: "50px",
          }}
        >
          Your event has been deleted!
        </Typography>
        <Link href="/post">
          <Button variant="outlined" size="large">
            Post Another Event
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}
