import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Page() {
  return (
    <Stack spacing={4} sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="h4">Video Added!</Typography>
      <Link href="/post/video">
        <Button variant="contained" size="large" color="primary">
          Add Another Video
        </Button>
      </Link>
    </Stack>
  );
}
