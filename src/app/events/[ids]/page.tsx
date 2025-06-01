import EventSearchScreen from "@/components/EventSearchScreen";
import Event from "@/types/Event";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";

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
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || "Undefined";
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent") || "Undefined";

  let events: Event[] = [];
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        `/events/ids?ids=${ids}&user_agent=${userAgent}&user_id=${userId}`
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
          genres: [],
          bandTypes: [],
        }}
        eventsInit={events}
        noFilters={false}
        landingPage={false}
        userId={userId}
        userAgent={userAgent}
      />
    </>
  );
}
