"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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
    console.log(userId);
    console.log(pathname);
  }, [pathname]);

  return null; // This component renders nothing
}
