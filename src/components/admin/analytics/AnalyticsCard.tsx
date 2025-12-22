import { Box, Stack, Typography } from "@mui/material";

interface AnalyticsCardProps {
  title: string;
  value: number;
}

export default function AnalyticsCard({ title, value }: AnalyticsCardProps) {
  return (
    <Box
      sx={{
        backgroundColor: "lightgray",
        padding: "25px",
        borderRadius: "25px",
      }}
    >
      <Stack
        direction={"column"}
        spacing={4}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h4">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </Stack>
    </Box>
  );
}
