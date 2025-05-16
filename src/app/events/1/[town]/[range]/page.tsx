import EventSearchScreenWrapper from "@/components/EventSearchScreenWrapper";
import PageVisitTracker from "@/components/PageVisitTracker";
import getDateByRange from "@/lib/get-date-by-range";
import {
  blankStructuredFormatting,
  GENRES,
  BAND_TYPES,
  TOWNS,
} from "@/types/constants";
import Event from "@/types/Event";
import { Metadata } from "next";
import { cookies } from "next/headers";

interface PageProps {
  params: {
    town: string;
    range:
      | "today"
      | "tomorrow"
      | "this-weekend"
      | "this-week"
      | "next-weekend"
      | "next-week";
  };
}

const dateRangeDict = {
  today: "Today",
  tomorrow: "Tomorrow",
  "this-weekend": "This Weekend",
  "this-week": "This Week",
  "next-weekend": "Next Weekend",
  "next-week": "Next Week",
};

export function generateMetadata({
  params: { town, range },
}: PageProps): Metadata {
  const townFormatted = TOWNS[town.replaceAll("%2C", ",")][1];
  const rangeFormatted = dateRangeDict[range];

  return {
    title: `Live Music Events ${rangeFormatted} near ${townFormatted}`,
    description: `Easily find live music events happening ${rangeFormatted} near ${townFormatted}. You can search for events based on date, location, distance, and genres.`,
  };
}

export const revalidate = 0;

export default async function Page({ params: { town, range } }: PageProps) {
  const allCookies = cookies();
  let fromCookie = allCookies.get("from")?.value;
  if (fromCookie == undefined) {
    fromCookie = "Unknown";
  }

  const townFormatted = TOWNS[town.replaceAll("%2C", ",")][0];
  const genresFormatted = GENRES.join("::").replaceAll(" ", "+");
  const typesFormatted = BAND_TYPES.join("::").replaceAll(" ", "+");
  const dates = getDateByRange(range);

  let events: Event[] = [];
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        `/events?from_date=${dates[0]}&to_date=${dates[1]}&address=${townFormatted}&max_distance=20+mi&genres=${genresFormatted}&band_types=${typesFormatted}&from_where=${fromCookie}`
    );
    if (response.ok) {
      const eventsRaw = await response.json();
      events = eventsRaw.events;
    }
  } catch (error) {}

  return (
    <>
      <PageVisitTracker page="SEO Page From Google" />
      <EventSearchScreenWrapper
        filters={{
          dateRange: undefined,
          address: {
            description: townFormatted,
            structured_formatting: blankStructuredFormatting,
            place_id: "",
          },
          maxDistance: "20 mi",
          genres: ["All Genres"],
          bandTypes: ["All Types"],
        }}
        eventsInit={events}
        noFilters={false}
        landingPage={false}
        fromDate={dates[0]}
        toDate={dates[1]}
      />
    </>
  );
}
