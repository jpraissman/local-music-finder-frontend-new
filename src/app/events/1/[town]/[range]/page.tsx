import NewEventSearchPage from "@/components/newEventSearchPage/NewEventSearchPage";
import getDateByRange from "@/lib/get-date-by-range";
import { getEventsByLoc } from "@/lib/get-events-by-loc";
import { TOWNS } from "@/types/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
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
  const dates = getDateByRange(range);
  const [fromYear, fromMonth, fromDay] = dates[0].split("-").map(Number);
  const [toYear, toMonth, toDay] = dates[1].split("-").map(Number);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["events", townFormatted],
    queryFn: () => {
      return getEventsByLoc(townFormatted);
    },
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NewEventSearchPage
        initialLocation={townFormatted}
        initialDateRange={{
          from: new Date(fromYear, fromMonth - 1, fromDay, 12, 0, 0),
          to: new Date(toYear, toMonth - 1, toDay, 12, 0, 0),
        }}
        initialMaxDistance={35}
        initialGenres={[]}
        initialBandTypes={[]}
        initialSort="Date"
        initialEvents={null}
        initialLocationDisplay={null}
        userAgent={userAgent}
        userId={userId}
      />
    </HydrationBoundary>
  );
}
