"use client";

import Event from "@/types/Event";
import { Box, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import NamesAndGenres from "./NamesAndGenres";
import OtherEventDetails from "./OtherEventDetails";
import Image from "next/image";
import get_random_image from "@/lib/get-random-image";

export interface NewEventCardProps {
  event: Event;
  size: "Small" | "Large";
  userAgent: string;
  userId: string;
}

export default function NewEventCard({
  event,
  size,
  userAgent,
  userId,
}: NewEventCardProps) {
  const YouTubeVideo = dynamic(() => import("./YouTubeVideo"), { ssr: false });

  return (
    <Stack
      direction={size === "Small" ? "column" : "row"}
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 20px rgba(0,0,0,0.12)",
        },
        backgroundColor: "rgba(244, 241, 241, 0.98)",
        borderRadius: "25px",
        width: "100%",
      }}
    >
      <Box sx={{ width: size === "Small" ? "100%" : "50%" }}>
        {event.youtube_id === "" && (
          <Box sx={{ position: "relative" }}>
            <Typography
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                zIndex: 2,
                color: "white",
                backgroundColor: "secondary.main",
                padding: "4px 20px",
                borderRadius: "25px",
                whiteSpace: "nowrap",
              }}
              variant="body1"
              fontWeight={"bold"}
            >
              Video of Band Coming Soon
            </Typography>
            <Image
              src={get_random_image(event.ranking_position)}
              width={1000}
              height={1000}
              alt="Image"
              style={{
                width: "100%",
                height: "auto",
                borderTopLeftRadius: "25px",
                borderTopRightRadius: size === "Small" ? "25px" : "0px",
                borderBottomLeftRadius: size === "Small" ? "0px" : "25px",
              }}
            />
          </Box>
        )}
        {event.youtube_id !== "" && (
          <YouTubeVideo
            videoId={event.youtube_id}
            size={size}
            eventId={event.id}
            userAgent={userAgent}
            userId={userId}
          />
        )}
      </Box>
      <Box sx={{ width: size === "Small" ? "90%" : "50%", padding: "20px" }}>
        <Stack direction={"column"}>
          <Stack direction="row" spacing={1}>
            <NamesAndGenres event={event} />
            <OtherEventDetails event={event} />
          </Stack>
          {event.other_info !== "" && (
            <Box
              sx={{ paddingTop: "20px", display: { xs: "flex", sm: "none" } }}
            >
              <Typography color="gray" variant="body1">
                {event.other_info}
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </Stack>
  );
}
