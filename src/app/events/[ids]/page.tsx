import EventSearchScreen from "@/components/EventSearchScreen";
import PageVisitTracker from "@/components/PageVisitTracker";
import {
  blankStructuredFormatting,
  GENRES,
  BAND_TYPES,
} from "@/types/constants";
import Event from "@/types/Event";
import { Metadata } from "next";
import { cookies } from "next/headers";

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
  let events: Event[] = [];
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + `/events/ids?ids=${ids}`
    );
    if (response.ok) {
      const eventsRaw = await response.json();
      events = eventsRaw.events;
    }
  } catch (error) {}

  return (
    <>
      <PageVisitTracker page="Specific Events" />
      <EventSearchScreen
        filters={{
          dateRange: "",
          address: {
            description: "",
            structured_formatting: blankStructuredFormatting,
            place_id: "",
          },
          maxDistance: "",
          genres: [],
          bandTypes: [],
        }}
        eventsInit={events}
        noFilters={false}
        landingPage={false}
      />
    </>
  );
}
