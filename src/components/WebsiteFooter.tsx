import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function WebsiteFooter() {
  return (
    <Stack
      direction="row"
      spacing={4}
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Link href="/">
        <Image
          src="/logo2.png"
          width={100}
          height={100}
          alt="The Local Music Finder Logo"
        ></Image>
      </Link>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Stack direction="column" spacing={0.2}>
          <Typography color="gray" variant="body2">
            {"Copyright © Worm Inc. All rights reserved. "}
          </Typography>
          <Typography color="gray" variant="body2">
            <Link href="about-us">About Us</Link>
            {" | "}
            <Link href="/privacy-policy">Privacy Policy</Link>
            {" | "}
            <Link href="/terms">Terms and Conditions</Link>
            {" | "}
            <Link href="/faqs">FAQs</Link>
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
