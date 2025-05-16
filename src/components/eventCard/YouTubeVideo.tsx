"use client";

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
}

export default function YouTubeVideo({ videoId }: YouTubeVideoProps) {
  return <lite-youtube videoid={videoId} title="Test Title" />;
}
