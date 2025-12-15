"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { createUser, sendUrlEntryEvent } from "@/api/apiCalls";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CreateCampaignUserEventDTO } from "@/dto/analytics/CreateCampaignUserEvent.dto";

const GOOGLE_CAMPAIGN_ID = 1;
const UNKNOWN_CAMPAIGN_ID = 2;
const ONE_HOUR = 60 * 60 * 1000;
const TWO_MINUTES = 2 * 60 * 1000;

type AnalyticsContextType = {};

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined
);

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const [urlEntry, setUrlEntry] = useState<string | null>(null);

  const setUserIdOnMount = async () => {
    const userIdCookie = Cookies.get("newUserId");
    if (userIdCookie && userIdCookie !== "setting") {
      Cookies.set("newUserId", userIdCookie, { expires: 365 });
      setUserId(userIdCookie);
    } else if (!userIdCookie) {
      Cookies.set("newUserId", "setting", { expires: ONE_HOUR });
      try {
        const { userId: newUserId } = await createUser();
        Cookies.set("newUserId", newUserId, { expires: 365 });
        setUserId(newUserId);
      } catch {
        setUserId(null);
      }
    }
  };

  const getNewCampaignId = (): string => {
    const campaignIdQueryParam = searchParams.get("c");
    if (campaignIdQueryParam) {
      return campaignIdQueryParam;
    }
    if (
      document.referrer &&
      document.referrer.toLocaleLowerCase().includes("google")
    ) {
      return GOOGLE_CAMPAIGN_ID.toString();
    }
    return UNKNOWN_CAMPAIGN_ID.toString();
  };

  const setCampaignIdOnMount = () => {
    const campaignIdCookie = Cookies.get("campaignId");
    if (campaignIdCookie) {
      setCampaignId(campaignIdCookie);
    } else {
      const newCampaignId = getNewCampaignId();
      Cookies.set("campaignId", newCampaignId, {
        expires: new Date(Date.now() + ONE_HOUR),
      });
      setCampaignId(newCampaignId);
    }
  };

  const setUrlEntryOnMount = () => {
    const urlEntry = Cookies.get("urlEntry");
    if (urlEntry) {
      setUrlEntry(urlEntry);
    } else {
      Cookies.set("urlEntry", pathname, {
        expires: new Date(Date.now() + ONE_HOUR),
      });
      setUrlEntry(pathname);
    }
  };

  useEffect(() => {
    setUserIdOnMount();
    setCampaignIdOnMount();
    setUrlEntryOnMount();
  }, []);

  useEffect(() => {
    if (campaignId && pathname) {
      router.push(pathname, { scroll: false });
    }
  }, [campaignId, pathname, router]);

  const sendUrlEntry = async (data: CreateCampaignUserEventDTO) => {
    try {
      await sendUrlEntryEvent(data);
    } catch {}
  };

  useEffect(() => {
    // send an analytics request when all the information we need is set
    const hasSentUrlEntryCookie = Cookies.get("hasSentUrlEntry");
    if (campaignId && userId && urlEntry && !hasSentUrlEntryCookie) {
      Cookies.set("hasSentUrlEntry", pathname, {
        expires: new Date(Date.now() + ONE_HOUR + TWO_MINUTES),
      });
      sendUrlEntry({ userId, campaignId: Number(campaignId), url: urlEntry });
    }
  }, [campaignId, userId, urlEntry]);

  return (
    <AnalyticsContext.Provider value={undefined}>
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
