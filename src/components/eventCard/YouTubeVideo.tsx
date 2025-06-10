"use client";

import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

import("@justinribeiro/lite-youtube");

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lite-youtube": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        videoid: string;
        playlabel?: string;
        nocookie?: boolean;
        short?: boolean;
        videotitle?: string;
      };
    }
  }
}

interface YouTubeVideoProps {
  videoId: string;
  size: "Small" | "Large";
  eventId: number;
  userId: string;
  userAgent: string;
}

export default function YouTubeVideo({
  videoId,
  size,
  eventId,
  userId,
  userAgent,
}: YouTubeVideoProps) {
  const [videoClicked, setVideoClicked] = useState(false);

  return (
    <Box
      onClick={() => {
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/video-clicked`, {
          user_id: userId,
          user_agent: userAgent,
          event_id: eventId,
        });
        setVideoClicked(true);
      }}
      sx={{ position: "relative" }}
    >
      {!videoClicked && (
        <Typography
          sx={{
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "4px 20px",
            borderRadius: "25px",
            whiteSpace: "nowrap",
          }}
          variant="h5"
          fontWeight={"bold"}
        >
          Watch Video of Band
        </Typography>
      )}
      <lite-youtube
        videoid={videoId}
        style={{
          borderTopLeftRadius: "25px",
          borderTopRightRadius: size === "Small" ? "25px" : "0px",
          borderBottomLeftRadius: size === "Small" ? "0px" : "25px",
        }}
      />
    </Box>
  );
}
