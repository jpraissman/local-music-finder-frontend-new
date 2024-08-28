import EventSearchScreen from "@/components/EventSearchScreen";
import {
  blankStructuredFormatting,
  GENRES,
  BAND_TYPES,
} from "@/types/constants";
import Event from "@/types/Event";
import { Metadata } from "next";

interface PageProps {
  params: {
    address: string;
    dist: string;
    date: string;
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
  params: { address, dist, date, genres, types },
}: PageProps) {
  const addressFormatted = address
    .replaceAll("%20", "+")
    .replaceAll("%2C", ",");
  const distFormatted = dist.replaceAll("%20", "+");
  const dateFormatted = date.replaceAll("%20", "+");
  let genresFormatted = genres.replaceAll("%20", "+").split("%2C").join("::");
  let typesFormatted = types.replaceAll("%20", "+").split("%2C").join("::");

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
        `/events?date_range=${dateFormatted}&address=${addressFormatted}&max_distance=${distFormatted}&genres=${genresFormatted}&band_types=${typesFormatted}`
    );
    const eventsRaw = await response.json();
    events = eventsRaw.events;
  } catch (error) {}

  return (
    <EventSearchScreen
      filters={{
        dateRange: date.replaceAll("%20", " "),
        address: {
          description: address.replaceAll("%20", " ").replaceAll("%2C", ","),
          structured_formatting: blankStructuredFormatting,
        },
        maxDistance: dist.replaceAll("%20", " "),
        genres: genres.replaceAll("%20", " ").split("%2C"),
        bandTypes: types.replaceAll("%20", " ").split("%2C"),
      }}
      eventsInit={events}
      noFilters={false}
    />
  );
}
