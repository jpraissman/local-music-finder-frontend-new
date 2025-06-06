"use client";

import { Box } from "@mui/material";
import axios from "axios";

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
  return (
    <Box
      onClick={() => {
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/video-clicked`, {
          user_id: userId,
          user_agent: userAgent,
          event_id: eventId,
        });
      }}
    >
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
