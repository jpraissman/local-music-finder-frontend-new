import EventSearchScreen from "@/components/EventSearchScreen";
import {
  blankStructuredFormatting,
  GENRES,
  BAND_TYPES,
  TOWNS,
} from "@/types/constants";
import Event from "@/types/Event";
import { cookies } from "next/headers";
import { Metadata } from "next";
import PageVisitTracker from "@/components/PageVisitTracker";

interface PageProps {
  params: {
    address: string;
  };
}

export function generateMetadata({ params: { address } }: PageProps): Metadata {
  return {
    title:
      "Live Music Events near " +
      TOWNS[address][1] +
      " - The Local Music Finder",
    description: `There are live music events near ${TOWNS[address][1]}. Explore bars, bands, and venues near you to enjoy.`,
  };
}

export const revalidate = 0;

export default async function Page({ params: { address } }: PageProps) {
  const allCookies = cookies();
  let fromCookie = allCookies.get("from")?.value;
  if (fromCookie == undefined) {
    fromCookie = "Unknown";
  }

  const genres = GENRES.join("::").replaceAll(" ", "+");
  const types = BAND_TYPES.join("::").replaceAll(" ", "+");

  let events: Event[] = [];
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        `/events?date_range=Next+30+Days&address=${TOWNS[address][0]}&max_distance=35+mi&genres=${genres}&band_types=${types}&from_where=${fromCookie}`
    );
    if (response.ok) {
      const eventsRaw = await response.json();
      events = eventsRaw.events;
    }
  } catch (error) {}

  return (
    <>
      <PageVisitTracker page="Clicked from Google" />
      <EventSearchScreen
        filters={{
          dateRange: "Next 30 Days",
          address: {
            description: TOWNS[address][0],
            structured_formatting: blankStructuredFormatting,
          },
          maxDistance: "35 mi",
          genres: ["All Genres"],
          bandTypes: ["All Types"],
        }}
        eventsInit={events}
        noFilters={false}
        landingPage={false}
      />
    </>
  );
}
