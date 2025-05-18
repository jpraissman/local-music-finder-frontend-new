import EventSearchScreenWrapper from "@/components/EventSearchScreenWrapper";
import PageVisitTracker from "@/components/PageVisitTracker";
import {
  blankStructuredFormatting,
  GENRES,
  BAND_TYPES,
} from "@/types/constants";
import Event from "@/types/Event";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";

interface PageProps {
  params: {
    address: string;
    dist: string;
    fromDate: string;
    toDate: string;
    genres: string;
    types: string;
  };
}

export function generateMetadata({ params: { address } }: PageProps): Metadata {
  const addressFormatted = address
    .replaceAll("%20", " ")
    .replaceAll("%2C", ",");

  return {
    title:
      "Live Music Events near " +
      addressFormatted +
      " - The Local Music Finder",
    description: `There are live music events near ${addressFormatted}. Explore bars, bands, and venues near you to enjoy.`,
  };
}

export const revalidate = 0;

export default async function Page({
  params: { address, dist, fromDate, toDate, genres, types },
}: PageProps) {
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent");
  const referer = requestHeaders.get("referer");
  const ip = requestHeaders.get("x-forwarded-for");

  const allCookies = cookies();
  let fromCookie = allCookies.get("from")?.value;
  if (fromCookie == undefined) {
    fromCookie = "Unknown";
  }

  const addressFormatted = address.replaceAll("-", "+").replaceAll("%2C", ",");
  const distFormatted = dist.replaceAll("-", "+");
  let genresFormatted = genres.replaceAll("-", "+").split("%2C").join("::");
  let typesFormatted = types.replaceAll("-", "+").split("%2C").join("::");

  if (genresFormatted === "All+Genres") {
    genresFormatted = GENRES.join("::").replaceAll(" ", "+");
  }
  if (typesFormatted === "All+Types") {
    typesFormatted = BAND_TYPES.join("::").replaceAll(" ", "+");
  }

  let events: Event[] = [];
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        `/events?from_date=${fromDate}&to_date=${toDate}&address=${addressFormatted}&max_distance=${distFormatted}&genres=${genresFormatted}&band_types=${typesFormatted}&from_where=${fromCookie}&user_agent=${userAgent}&ip_address=${ip}&referer=${referer}`
    );
    if (response.ok) {
      const eventsRaw = await response.json();
      events = eventsRaw.events;
    }
  } catch (error) {}

  return (
    <>
      <PageVisitTracker page="Custom Search" />
      <EventSearchScreenWrapper
        filters={{
          dateRange: undefined,
          address: {
            description: address.replaceAll("-", " ").replaceAll("%2C", ","),
            structured_formatting: blankStructuredFormatting,
            place_id: "",
          },
          maxDistance: dist.replaceAll("-", " "),
          genres: genres.replaceAll("-", " ").split("%2C"),
          bandTypes: types.replaceAll("-", " ").split("%2C"),
        }}
        eventsInit={events}
        noFilters={false}
        landingPage={false}
        fromDate={fromDate}
        toDate={toDate}
      />
    </>
  );
}
