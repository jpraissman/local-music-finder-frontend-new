import NewEventSearchPage from "@/components/newEventSearchPage/NewEventSearchPage";
import Event from "@/types/Event";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";

export function generateMetadata(): Metadata {
  return {
    title: "Live Music Events - The Local Music Finder",
  };
}

export const revalidate = 0;

export default async function Page() {
  let events: Event[] = [];
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        `/events/all-events-this-week?user_agent=${userAgent}&user_id=${userId}`
    );
    if (response.ok) {
      const eventsRaw = await response.json();
      events = eventsRaw.events;
    }
  } catch (error) {}

  return (
    <NewEventSearchPage
      initialLocation={null}
      initialDateRange={undefined}
      initialMaxDistance={20}
      initialGenres={[]}
      initialBandTypes={[]}
      initialSort="Date"
      initialEvents={events}
      initialLocationDisplay="New Jersey"
      userAgent={userAgent}
      userId={userId}
    />
  );
}
