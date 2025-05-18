import EventSearchScreen from "@/components/EventSearchScreen";
import PageVisitTracker from "@/components/PageVisitTracker";
import Event from "@/types/Event";
import { Metadata } from "next";
import { headers } from "next/headers";

interface PageProps {
  params: {
    countyNames: string;
  };
}

export function generateMetadata({
  params: { countyNames },
}: PageProps): Metadata {
  return {
    title: `Live Music Events In ${countyNames
      .replaceAll("%20", " ")
      .split("%3A%3A")
      .join(", ")} - The Local Music Finder`,
  };
}

export const revalidate = 0;

export default async function Page({ params: { countyNames } }: PageProps) {
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent");
  const referer = requestHeaders.get("referer");
  const ip = requestHeaders.get("x-forwarded-for");

  let events: Event[] = [];
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        `/events/county/${countyNames}?user_agent=${userAgent}&ip_address=${ip}&referer=${referer}`
    );
    if (response.ok) {
      const eventsRaw = await response.json();
      events = eventsRaw.events;
    }
  } catch (error) {}

  return (
    <>
      <PageVisitTracker page="Events County Page" />
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
        searchLocation={countyNames
          .replaceAll("%20", " ")
          .split("%3A%3A")
          .join(", ")}
        searchDateRange="in the next month"
      />
    </>
  );
}
