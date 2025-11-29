import { findEvents } from "@/api/apiCalls";
import NewEventSearchPage from "@/components/newEventSearchPage/NewEventSearchPage";
import getDateByRange from "@/lib/get-date-by-range";
import { TOWNS } from "@/newTypes/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

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
  const townFormatted = TOWNS[town.replaceAll("%2C", ",")].display_name;
  const rangeFormatted = dateRangeDict[range];

  return {
    title: `Live Music Events ${rangeFormatted} near ${townFormatted}`,
    description: `Easily find live music events happening ${rangeFormatted} near ${townFormatted}. You can search for events based on date, location, distance, and genres.`,
  };
}

export const revalidate = 0;

export default async function Page({ params: { town, range } }: PageProps) {
  const townKey = town.replaceAll("%2C", ",");
  const townLocationId = TOWNS[townKey].place_id;
  const dates = getDateByRange(range);
  const [fromYear, fromMonth, fromDay] = dates[0].split("-").map(Number);
  const [toYear, toMonth, toDay] = dates[1].split("-").map(Number);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["findEvents", townLocationId],
    queryFn: () => findEvents(townLocationId),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NewEventSearchPage
        initialLocation={{
          address: TOWNS[townKey].real_name,
          locationId: townLocationId,
        }}
        initialDateRange={{
          from: new Date(fromYear, fromMonth - 1, fromDay, 12, 0, 0),
          to: new Date(toYear, toMonth - 1, toDay, 12, 0, 0),
        }}
      />
    </HydrationBoundary>
  );
}
