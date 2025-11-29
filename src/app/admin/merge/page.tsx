import { Box, Button, Stack, Typography } from "@mui/material";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const cookieStore = await cookies();
  const adminKeyCookie = cookieStore.get("adminKey");

  if (!adminKeyCookie) {
    return <Box>There was an error.</Box>;
  }

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
          <Link href={"/merge/venue"}>
            <Button variant="contained" size="large">
              Merge Venues
            </Button>
          </Link>
          <Link href={"/merge/band"}>
            <Button variant="contained" size="large" color="secondary">
              Merge Bands
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
