import { Box, Skeleton } from "@mui/material";

export default function EventCardSkeleton() {
  return (
    <Box sx={{ height: "350px", width: "100%" }}>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={"100%"}
        sx={{ borderRadius: "25px" }}
      />
    </Box>
  );
}
