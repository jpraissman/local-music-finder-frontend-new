import { Box, Button, Stack, Typography } from "@mui/material";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  return (
    <Box
      sx={{ paddingTop: "100px", display: "flex", justifyContent: "center" }}
    >
      <Stack
        direction={"column"}
        spacing={10}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Typography variant="h3">What would you like to merge?</Typography>
        <Stack direction={"row"} spacing={10}>
          <Link href={"/admin/merge/venue"}>
            <Button variant="contained" size="large">
              Merge Venues
            </Button>
          </Link>
          <Link href={"/admin/merge/band"}>
            <Button variant="contained" size="large" color="secondary">
              Merge Bands
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
