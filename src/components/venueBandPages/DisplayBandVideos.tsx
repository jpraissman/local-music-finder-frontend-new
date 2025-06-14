import { loadBandVideos } from "@/lib/load-band-info";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";

interface DisplayBandVideosProps {
  bandName: string;
  bandId: string;
}

export default function DisplayBandVideos({
  bandName,
  bandId,
}: DisplayBandVideosProps) {
  const { data: videoIds, isLoading } = useSuspenseQuery({
    queryKey: ["bandVideos", bandId],
    queryFn: () => loadBandVideos(bandId),
  });

  return (
    <Box sx={{ paddingX: { xs: "20px", sm: "50px", md: "100px" } }}>
      <Stack direction={"column"}>
        {!isLoading && videoIds && videoIds.video_ids.length > 0 && (
          <Grid container spacing={2} rowSpacing={5} columnSpacing={10}>
            {videoIds.video_ids.map((videoId) => (
              <Grid size={{ xs: 12, lg: 6 }} key={videoId}>
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube Video"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        )}
        {!isLoading && videoIds && videoIds.video_ids.length == 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "30px",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: { xs: "20px", md: "30px" } }}>
              We currently don't have any videos of this band/performer.
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "30px",
            textAlign: "center",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ paddingTop: "50px" }}
          >
            <Typography sx={{ fontSize: { xs: "20px", md: "30px" } }}>
              Want to post a video for this band/performer?
            </Typography>
            <Link href={`/post/video?b=${bandName}&id=${bandId}`}>
              <Button variant="contained" sx={{ fontSize: "20px" }}>
                Post Video
              </Button>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
