"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import Cookies from "js-cookie";
import {
  sendHeartbeat as sendHeartbeatApiCall,
  sendSearchUserEvent as sendSearchUserEventApiCall,
  startSession as startSessionApiCall,
} from "@/api/apiCalls";
import { usePathname, useSearchParams } from "next/navigation";
import {
  REFERER_COOKIE_NAME,
  URL_ENTRY_COOKIE_NAME,
  USER_ID_COOKIE_NAME,
} from "@/middleware";
import { useScrollTracking } from "@/hooks/useScrollTracking";

const TEN_SECONDS = 10_000;
const TWO_SECONDS = 2_000;

const SESSION_ACTIVITY_NAME = "sessionActivity";
const NUM_SCROLL_NAME = "numScroll";

export enum SearchContext {
  HOME_PAGE = "Home Page",
  LOCATION_LINK = "Location Link",
  DIRECT_SEARCH = "Direct Search",
}

type AnalyticsContextType = {
  sendSearchUserEvent: (
    locationId: string,
    searchContext: SearchContext
  ) => void;
  addSessionActivity: (activity: string) => void;
};

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined
);

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Start session logic
  const startSession = useCallback(async () => {
    const userId = Cookies.get(USER_ID_COOKIE_NAME);
    if (userId) {
      const campaignId = searchParams.get("c");
      const referer = Cookies.get(REFERER_COOKIE_NAME);
      const urlEntry = Cookies.get(URL_ENTRY_COOKIE_NAME);
      try {
        await startSessionApiCall({
          userId,
          campaignId: campaignId ? Number(campaignId) : null,
          referer: referer ?? null,
          urlEntry: urlEntry ?? pathname,
        });
      } catch {}
    }
  }, [searchParams, pathname]);

  useEffect(() => {
    startSession();
  }, [startSession]);

  // Heartbeat logic
  const addSessionActivity = useCallback((newActivity: string) => {
    const curTimeEST = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());

    const curSessionActivity =
      sessionStorage.getItem(SESSION_ACTIVITY_NAME) ?? "";
    sessionStorage.setItem(
      SESSION_ACTIVITY_NAME,
      `${curSessionActivity}\n\n[${curTimeEST}] ${newActivity}`
    );
  }, []);

  const sendHeartbeat = useCallback(async () => {
    const curSessionActivity =
      sessionStorage.getItem(SESSION_ACTIVITY_NAME) ?? "";
    sessionStorage.setItem(SESSION_ACTIVITY_NAME, "");
    const curNumScrolls = sessionStorage.getItem(NUM_SCROLL_NAME)
      ? Number(sessionStorage.getItem(NUM_SCROLL_NAME))
      : 0;
    sessionStorage.setItem(NUM_SCROLL_NAME, "0");
    const userId = Cookies.get(USER_ID_COOKIE_NAME);
    if (userId) {
      try {
        await sendHeartbeatApiCall({
          userId,
          activityOverview: curSessionActivity,
          numScrolls: curNumScrolls,
        });
      } catch {}
    }
  }, []);

  useEffect(() => {
    addSessionActivity(`User went to path: ${pathname}`);
  }, [pathname, addSessionActivity]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        addSessionActivity("Ten Seconds Passed");
        sendHeartbeat();
      }
    }, TEN_SECONDS);

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        addSessionActivity("User went away from the tab");
        sendHeartbeat();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // Track scrolls
  const handleScroll = useCallback(() => {
    addSessionActivity("User scrolled");
    const curNumScrolls = sessionStorage.getItem(NUM_SCROLL_NAME)
      ? Number(sessionStorage.getItem(NUM_SCROLL_NAME))
      : 0;
    const newNumScrolls = curNumScrolls + 1;
    sessionStorage.setItem(NUM_SCROLL_NAME, newNumScrolls.toString());
  }, [addSessionActivity]);

  useScrollTracking({ callback: handleScroll, wait: TWO_SECONDS });

  // Event logic
  const sendSearchUserEvent = useCallback(
    async (locationId: string, searchContext: SearchContext) => {
      try {
        const userId = Cookies.get(USER_ID_COOKIE_NAME);
        if (userId) {
          await sendSearchUserEventApiCall({
            userId,
            locationId,
            searchContext,
          });
        }
      } catch {}
    },
    []
  );

  return (
    <AnalyticsContext.Provider
      value={useMemo(
        () => ({
          sendSearchUserEvent,
          addSessionActivity,
        }),
        [sendSearchUserEvent, addSessionActivity]
      )}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalyticsContext = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error(
      "useAnalyticsContext must be used within a AnalyticsProvider"
    );
  }

  return context;
};
