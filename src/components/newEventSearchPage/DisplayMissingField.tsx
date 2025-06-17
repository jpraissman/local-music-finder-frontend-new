import { DateRange, LocationOn } from "@mui/icons-material";
import { Avatar, Paper, Stack, Typography } from "@mui/material";
import { ReactElement } from "react";

interface DisplayMissingFieldProps {
  icon: ReactElement;
  header: string;
  body: string;
}

export default function DisplayMissingField({
  icon,
  header,
  body,
}: DisplayMissingFieldProps) {
  return (
    <Paper
      elevation={5}
      sx={{
        backgroundColor: "#fef2f2",
        borderRadius: "25px",
        paddingX: "50px",
        paddingY: "25px",
      }}
    >
      <Stack
        direction={"column"}
        spacing={1}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Avatar sx={{ backgroundColor: "#fee2e2", width: 60, height: 60 }}>
          {icon}
        </Avatar>
        <Typography fontWeight={"bold"} color="#991b1b" variant="h6">
          {header}
        </Typography>
        <Typography fontWeight={"medium"} color="#b91c1c" variant="body1">
          {body}
        </Typography>
      </Stack>
    </Paper>
  );
}
