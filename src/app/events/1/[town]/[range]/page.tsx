import EventSearchScreenWrapper from "@/components/EventSearchScreenWrapper";
import getDateByRange from "@/lib/get-date-by-range";
import {
  blankStructuredFormatting,
  GENRES,
  BAND_TYPES,
  TOWNS,
} from "@/types/constants";
import Event from "@/types/Event";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";

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
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || "Undefined";
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent") || "Undefined";

  const townFormatted = TOWNS[town.replaceAll("%2C", ",")][0];
  const genresFormatted = GENRES.join("::").replaceAll(" ", "+");
  const typesFormatted = BAND_TYPES.join("::").replaceAll(" ", "+");
  const dates = getDateByRange(range);

  let events: Event[] = [];
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        `/events?from_date=${dates[0]}&to_date=${dates[1]}&address=${townFormatted}&max_distance=20+mi&genres=${genresFormatted}&band_types=${typesFormatted}&user_agent=${userAgent}&user_id=${userId}`
    );
    if (response.ok) {
      const eventsRaw = await response.json();
      events = eventsRaw.events;
    }
  } catch (error) {}

  return (
    <div>Test</div>
    // <NewEventSearchPage
    //   initialLocation={null}
    //   initialDateRange={undefined}
    //   initialMaxDistance={20}
    //   initialGenres={[]}
    //   initialBandTypes={[]}
    //   initialSort="Date"
    //   initialEvents={events}
    //   initialLocationDisplay="New Jersey"
    //   userAgent={userAgent}
    //   userId={userId}
    // />
  );
}
