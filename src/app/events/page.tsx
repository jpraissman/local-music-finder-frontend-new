import EventSearchScreen from "@/components/EventSearchScreen";
import PageVisitTracker from "@/components/PageVisitTracker";
import { blankStructuredFormatting } from "@/types/constants";
import Event from "@/types/Event";
import { Metadata } from "next";
import { headers } from "next/headers";

interface PageProps {
  params: {
    ids: string;
  };
}

export function generateMetadata(): Metadata {
  return {
    title: "Live Music Events - The Local Music Finder",
  };
}

export const revalidate = 0;

export default async function Page({ params: { ids } }: PageProps) {
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent");
  const referer = requestHeaders.get("referer");
  const ip = requestHeaders.get("x-forwarded-for");

  let events: Event[] = [];
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        `/events/all-events-this-week?user_agent=${userAgent}&ip_address=${ip}&referer=${referer}`
    );
    if (response.ok) {
      const eventsRaw = await response.json();
      events = eventsRaw.events;
    }
  } catch (error) {}

  return (
    <>
      <PageVisitTracker page="Landing Page With Events" />
      <EventSearchScreen
        filters={{
          dateRange: undefined,
          address: undefined,
          maxDistance: "",
          genres: ["All Genres"],
          bandTypes: ["All Types"],
        }}
        eventsInit={events}
        noFilters={false}
        landingPage={true}
        searchLocation="New Jersey"
        searchDateRange="this week"
      />
    </>
  );
}
