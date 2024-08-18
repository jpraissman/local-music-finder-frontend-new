import EventSearchScreen from "@/components/EventSearchScreen";
import { blankStructuredFormatting } from "@/types/constants";
import Event from "@/types/Event";
import { Metadata } from "next";

interface PageProps {
  params: {
    address: string;
    placeId: string;
    dist: string;
    date: string;
    genres: string;
    types: string;
  };
}

export async function generateMetadata({
  params: { address, placeId, dist, date, genres, types },
}: PageProps): Promise<Metadata> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL +
      `/events?date_range=${date.replace(
        /%20/g,
        "+"
      )}&address_id=${placeId}&max_distance=${dist.replace(
        /%20/g,
        "+"
      )}&genres=${genres
        .replace(/%20/g, "+")
        .split("%2C")
        .join("/")}&band_types=${types
        .replace(/%20/g, "+")
        .split("%2C")
        .join("/")}`
  );
  const eventsRaw = await response.json();
  const events: Event[] = eventsRaw.events;

  // let titleText =
  //   "Live Music near " + address.replace(/%20/g, " ").replace(/%2C/g, ",");
  // if (date === "Today" || date === "Tomorrow") {
  //   titleText +=
  // }

  return {
    title:
      "Live Music near " + address.replace(/%20/g, " ").replace(/%2C/g, ","),
    description: `There are ${events.length} live music events near ${address
      .replace(/%20/g, " ")
      .replace(
        /%2C/g,
        ","
      )}. Explore bars, bands, and venues near you to enjoy.`,
  };
}

export const revalidate = 0;

export default async function Page({
  params: { address, placeId, dist, date, genres, types },
}: PageProps) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL +
      `/events?date_range=${date.replace(
        /%20/g,
        "+"
      )}&address_id=${placeId}&max_distance=${dist.replace(
        /%20/g,
        "+"
      )}&genres=${genres
        .replace(/%20/g, "+")
        .split("%2C")
        .join("/")}&band_types=${types
        .replace(/%20/g, "+")
        .split("%2C")
        .join("/")}`
  );
  const eventsRaw = await response.json();
  const events: Event[] = eventsRaw.events;

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <EventSearchScreen
      filters={{
        dateRange: date.replace(/%20/g, " "),
        address: {
          description: address.replace(/%20/g, " ").replace(/%2C/g, ","),
          place_id: placeId,
          structured_formatting: blankStructuredFormatting,
        },
        maxDistance: dist.replace(/%20/g, " "),
        genres: genres.replace(/%20/g, " ").split("%2C"),
        bandTypes: types.replace(/%20/g, " ").split("%2C"),
      }}
      eventsInit={events}
      noFilters={false}
    />
  );
}
