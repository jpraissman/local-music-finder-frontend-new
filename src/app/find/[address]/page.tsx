import EventSearchScreen from "@/components/EventSearchScreen";
import {
  blankStructuredFormatting,
  GENRES,
  BAND_TYPES,
} from "@/types/constants";
import Event from "@/types/Event";
import { Metadata } from "next";

const towns: { [key: string]: string[] } = {
  "Wayne-NJ": ["Wayne, NJ, USA", "Wayne, NJ"],
  "Franklin-Lakes-NJ": ["Franklin Lakes, NJ, USA", "Franklin Lakes, NJ"],
  "Oakland-NJ": ["Oakland, NJ, USA", "Oakland, NJ"],
  "Pompton-Lakes-NJ": ["Pompton Lakes, NJ, USA", "Pompton Lakes, NJ"],
};

interface PageProps {
  params: {
    address: string;
  };
}

export function generateMetadata({ params: { address } }: PageProps): Metadata {
  return {
    title: "Live Music near " + towns[address][1],
    description: `There are live music events near ${towns[address][1]}. Explore bars, bands, and venues near you to enjoy.`,
  };
}

export const revalidate = 0;

export default async function Page({ params: { address } }: PageProps) {
  const genres = GENRES.join("::").replaceAll(" ", "+");
  const types = BAND_TYPES.join("::").replaceAll(" ", "+");

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL +
      `/events?date_range=All+Future+Dates&address=${towns[address][0]}&max_distance=35+mi&genres=${genres}&band_types=${types}`
  );
  const eventsRaw = await response.json();
  const events: Event[] = eventsRaw.events;

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <EventSearchScreen
      filters={{
        dateRange: "All Future Dates",
        address: {
          description: towns[address][0],
          structured_formatting: blankStructuredFormatting,
        },
        maxDistance: "35 mi",
        genres: ["All Genres"],
        bandTypes: ["All Types"],
      }}
      eventsInit={events}
      noFilters={false}
    />
  );
}