import { BandDTO } from "@/dto/band/Band.dto";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";

interface DisplayBandVideosProps {
  bandInfo: BandDTO;
}

export default function DisplayBandVideos({
  bandInfo,
}: DisplayBandVideosProps) {
  return (
    <Box sx={{ paddingX: { xs: "20px", sm: "50px", md: "100px" } }}>
      <Stack direction={"column"}>
        {bandInfo.youtubeVideoIds.length > 0 && (
          <Grid container spacing={2} rowSpacing={5} columnSpacing={10}>
            {bandInfo.youtubeVideoIds.map((videoId) => (
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
        {bandInfo.youtubeVideoIds.length == 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "30px",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: { xs: "20px", md: "30px" } }}>
              {"We currently don't have any videos of this band/performer."}
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
            <Link href={`/post/video?b=${bandInfo.bandName}&id=${bandInfo.id}`}>
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
