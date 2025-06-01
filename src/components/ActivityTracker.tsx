"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

interface ActivityTrackerProps {
  userId: string;
  userAgent: string | null;
  referer: string | null;
  ip: string | null;
}

export default function ActivityTracker({
  userId,
  userAgent,
  referer,
  ip,
}: ActivityTrackerProps) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/activity`, {
        user_id: userId,
        user_agent: userAgent,
        ip: ip,
        referer: referer,
        page: pathname,
      });
    } catch (error) {}
  }, [pathname]);

  return null; // This component renders nothing
}
