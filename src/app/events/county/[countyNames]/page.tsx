import EventSearchScreen from "@/components/EventSearchScreen";
import Event from "@/types/Event";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";

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
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || "Undefined";
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent") || "Undefined";

  let events: Event[] = [];
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        `/events/county/${countyNames}?user_agent=${userAgent}&user_id=${userId}`
    );
    if (response.ok) {
      const eventsRaw = await response.json();
      events = eventsRaw.events;
    }
  } catch (error) {}

  return (
    <>
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
        userId={userId}
        userAgent={userAgent}
      />
    </>
  );
}
