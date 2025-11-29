"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function AdminPageWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <Box display="flex" flexDirection="column" paddingTop={2}>
      <Box display="flex" justifyContent="flex-start" p={2}>
        <Button
          variant="contained"
          color="success"
          onClick={() => router.push("/admin")}
        >
          Back To Home
        </Button>
      </Box>
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingTop={10}
      >
        {children}
      </Box>
    </Box>
  );
}
