import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Page() {
  return (
    <Stack
      spacing={4}
      sx={{ display: "flex", alignItems: "center", paddingTop: "50px" }}
    >
      <Typography variant="h4">Video Posted!</Typography>
      <Link href="/post/video">
        <Button variant="contained" size="large" color="primary">
          Post Another Video
        </Button>
      </Link>
    </Stack>
  );
}
