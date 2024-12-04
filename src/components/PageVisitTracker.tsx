"use client";

import { useEffect } from "react";

type PageVisitTrackerProps = {
  page: string;
};

const PageVisitTracker: React.FC<PageVisitTrackerProps> = ({ page }) => {
  useEffect(() => {
    const allCookies = document.cookie;
    const userCookiesSplit = allCookies.split("; user=");
    let userCookie = "Unknown";
    if (userCookiesSplit.length == 2) {
      userCookie = userCookiesSplit[1].split(";")[0];
    }

    const fromCookiesSplit = allCookies.split("; from=");
    let fromCookie = "Unknown";
    if (fromCookiesSplit.length == 2) {
      fromCookie = fromCookiesSplit[1].split(";")[0];
    }

    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userCookie,
        page: page,
        from: fromCookie,
      }),
    }).catch(() => {});
  }, []);

  return null; // This component renders nothing
};

export default PageVisitTracker;
