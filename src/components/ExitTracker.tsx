"use client";

import { useEffect } from "react";

interface ExitTrackerProps {
  userId: string;
}

export default function ExitTracker({ userId }: ExitTrackerProps) {
  useEffect(() => {
    const trackExit = () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/track-user-exit/${userId}`;
      navigator.sendBeacon(url);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackExit();
      }
    };

    const handleBeforeUnload = () => {
      trackExit();
    };

    const handlePageHide = () => {
      trackExit();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  return null;
}
