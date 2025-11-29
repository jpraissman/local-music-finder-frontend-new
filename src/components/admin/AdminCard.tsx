"use client";

import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

interface AdminCardProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

export default function AdminCard({ icon, text, onClick }: AdminCardProps) {
  return (
    <Paper
      elevation={4}
      role="button"
      tabIndex={0}
      onClick={onClick}
      sx={{
        width: 220,
        height: 100,
        background: "linear-gradient(135deg, #455a64, #1c313a)",
        borderRadius: 3,
        padding: 4,
        textAlign: "center",
        color: "white",
        cursor: "pointer",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        outline: "none",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 8,
        },
        "&:focus": {
          boxShadow: `0 0 0 3px #90caf9`,
        },
      }}
    >
      <Stack direction="column" alignItems="center" spacing={2}>
        <Stack sx={{ fontSize: 50, color: "#90caf9" }}>
          {React.cloneElement(icon as any, { sx: { fontSize: 50 } })}
        </Stack>

        <Typography variant="h6" fontWeight={600}>
          {text}
        </Typography>
      </Stack>
    </Paper>
  );
}
