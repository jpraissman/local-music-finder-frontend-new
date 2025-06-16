import { DateRange, LocationOn } from "@mui/icons-material";
import { Avatar, Paper, Stack, Typography } from "@mui/material";

interface DisplayMissingFieldProps {
  type: "Location" | "Date";
}

export default function DisplayMissingField({
  type,
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
          {type === "Location" ? (
            <LocationOn sx={{ color: "#dc2626", fontSize: "40px" }} />
          ) : (
            <DateRange sx={{ color: "#dc2626", fontSize: "40px" }} />
          )}
        </Avatar>
        <Typography fontWeight={"bold"} color="#991b1b" variant="h6">
          {type === "Location" ? "Location Required" : "Date Range Required"}
        </Typography>
        <Typography fontWeight={"medium"} color="#b91c1c" variant="body1">
          {type === "Location"
            ? "You must enter a location to find events in your area"
            : "You must select a date range to find events in your area"}
        </Typography>
      </Stack>
    </Paper>
  );
}
