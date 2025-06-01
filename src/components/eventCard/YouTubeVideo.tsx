"use client";

import { Box } from "@mui/material";

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
}

export default function YouTubeVideo({ videoId, size }: YouTubeVideoProps) {
  return (
    <Box
      onClick={() => {
        // Send log to backend
        console.log("Video Clicked");
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
