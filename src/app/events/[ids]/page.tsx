import EventSearchScreen from "@/components/EventSearchScreen";
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
  const allCookies = cookies();
  let fromCookie = allCookies.get("from")?.value;
  if (fromCookie == undefined) {
    fromCookie = "Unknown";
  }

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
    <EventSearchScreen
      filters={{
        dateRange: "",
        address: {
          description: "",
          structured_formatting: blankStructuredFormatting,
        },
        maxDistance: "",
        genres: [],
        bandTypes: [],
      }}
      eventsInit={events}
      noFilters={false}
    />
  );
}
